"""NewtonX ADK 経由で記事ドラフトを生成するラッパー。

newtonx_adk/skills/newtonx-adk/SKILL.md に記載された
「終端マーカー方式」でトークン切れによる途中終了を検出・継続取得する。
"""

from __future__ import annotations

import json
import re

from newtonx_adk import ConfigManager, NewtonXClient

END_MARKER = "__END_OF_RESPONSE__"
MAX_CONTINUATIONS = 6


class GenerationError(RuntimeError):
    pass


def get_client() -> NewtonXClient:
    config_manager = ConfigManager()
    client = NewtonXClient(config_manager)
    if not client.authenticate():
        raise GenerationError(
            "NewtonX の認証に失敗しました。`python newtonx_adk/tools/setup_config.py` で "
            "Host/PAT を再設定してください。"
        )
    return client


def list_assistants(client: NewtonXClient) -> list[dict]:
    return client.get_assistants()


def _last_assistant_chat_order(client: NewtonXClient, chat_uid: str) -> int | None:
    detail = client.get_chat(chat_uid)
    if not detail:
        return None
    for msg in reversed(detail.get("messages", [])):
        if msg.get("role") == "assistant":
            return msg.get("chat_order")
    return None


def generate_raw(
    client: NewtonXClient,
    assistant_uid: str,
    prompt: str,
    web_search: bool = False,
    knowledge_search: bool = False,
    title: str = "ブログ記事ドラフト生成",
) -> tuple[str, str]:
    """プロンプトを送信し、終端マーカーが出るまで継続取得する。

    戻り値: (chat_uid, 終端マーカー除去済みの全文)
    """
    chat_uid = client.create_chat(assistant_uid=assistant_uid, title=title)
    if not chat_uid:
        raise GenerationError("チャットの作成に失敗しました。")

    response = client.send_message(
        chat_uid=chat_uid,
        message=prompt,
        web_search=web_search,
        knowledge_search=knowledge_search,
    )
    if response is None:
        raise GenerationError("メッセージの送信に失敗しました（応答なし）。新規チャットで再試行してください。")

    full_response = response
    for _ in range(MAX_CONTINUATIONS):
        if END_MARKER in full_response:
            break
        parent_order = _last_assistant_chat_order(client, chat_uid)
        if parent_order is None:
            break
        continuation = client.send_message(
            chat_uid=chat_uid,
            message=f"続きを出力してください。最後に必ず {END_MARKER} を付けてください。",
            parent_order=parent_order,
            web_search=web_search,
            knowledge_search=knowledge_search,
        )
        if not continuation:
            break
        full_response += continuation

    full_response = full_response.replace(END_MARKER, "").strip()
    return chat_uid, full_response


def extract_json_object(text: str) -> dict:
    """応答テキストから最初のバランスの取れた {...} を抜き出して parse する。

    コードフェンス(```json ... ```)や前後の説明文が混ざっていても対応する。
    """
    fence = re.search(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", text)
    candidate = fence.group(1) if fence else None

    if candidate is None:
        start = text.find("{")
        if start == -1:
            raise GenerationError("応答に JSON オブジェクトが見つかりませんでした。")
        depth = 0
        in_string = False
        escape = False
        end = None
        for i in range(start, len(text)):
            ch = text[i]
            if in_string:
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == '"':
                    in_string = False
                continue
            if ch == '"':
                in_string = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        if end is None:
            raise GenerationError("JSON オブジェクトの終端が見つかりませんでした（応答が途中で切れている可能性）。")
        candidate = text[start:end]

    try:
        return json.loads(candidate)
    except json.JSONDecodeError as e:
        raise GenerationError(f"JSON の parse に失敗しました: {e}") from e
