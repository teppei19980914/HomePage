"""ブログ記事たたき台 -> NewtonX生成 -> レビュー -> ファイル書き込み、を行うローカルGUI。

起動方法:
    myvenv\\Scripts\\streamlit run tools\\blog-generator\\app.py

コミット & プッシュは行わない（CLAUDE.md のルール通り、ユーザーが手動で実施する）。
このアプリが行うのは src/content/blog/{ja,en}/ へのファイル書き込みと、
npm test -- blog-calendar 等の検証コマンド実行まで。
"""

from __future__ import annotations

import datetime as dt
import traceback

import streamlit as st

import blog_repo
import checks
import newtonx_gen
import prompts

st.set_page_config(page_title="Blog Draft Generator", page_icon="📝", layout="wide")
st.title("📝 ブログ記事ドラフト生成（NewtonX連携）")

# --- NewtonX クライアント初期化 -------------------------------------------------
if "client" not in st.session_state:
    try:
        st.session_state.client = newtonx_gen.get_client()
        st.session_state.client_error = None
    except Exception as e:  # noqa: BLE001
        st.session_state.client = None
        st.session_state.client_error = str(e)

if st.session_state.client is None:
    st.error(f"NewtonX への接続に失敗しました: {st.session_state.client_error}")
    st.info("`myvenv\\Scripts\\python.exe newtonx_adk\\tools\\setup_config.py` で Host/PAT を設定してください。")
    st.stop()

client = st.session_state.client

if "assistants" not in st.session_state:
    st.session_state.assistants = newtonx_gen.list_assistants(client)

assistants = st.session_state.assistants
if not assistants:
    st.error("利用可能な NewtonX アシスタントが見つかりません。")
    st.stop()

# --- サイドバー: 生成設定 -------------------------------------------------------
with st.sidebar:
    st.header("生成設定")
    assistant_labels = [f"{a['name']}" for a in assistants]
    default_idx = 0
    for i, a in enumerate(assistants):
        if "GPT-4o" in a.get("name", "") or "高性能" in a.get("name", ""):
            default_idx = i
            break
    assistant_idx = st.selectbox(
        "アシスタント", options=range(len(assistants)), format_func=lambda i: assistant_labels[i], index=default_idx
    )
    selected_assistant = assistants[assistant_idx]
    st.caption(selected_assistant.get("description", ""))

    web_search = st.checkbox("Web検索を有効にする", value=False)
    knowledge_search = st.checkbox("ナレッジ検索を有効にする", value=False)

    st.divider()
    st.header("公開日")
    try:
        latest = blog_repo.latest_date("ja")
        st.caption(f"既存最新記事の日付: {latest.isoformat()}")
    except RuntimeError as e:
        st.error(str(e))
        st.stop()

    gap_days = st.slider("既存最新日からの間隔（日）", min_value=2, max_value=4, value=3)
    if "post_date" not in st.session_state or st.session_state.get("gap_days") != gap_days:
        st.session_state.post_date = blog_repo.suggest_date(gap_days)
        st.session_state.gap_days = gap_days
    post_date = st.date_input("この記事の公開日", value=st.session_state.post_date)
    if not blog_repo.is_date_available(post_date):
        st.error("この日付は既に使用されています。同日複数投稿はできません。")

# --- 入力: たたき台 -------------------------------------------------------------
st.subheader("1. たたき台を入力")
draft_text = st.text_area("記事のたたき台・アウトライン", height=250, key="draft_text")

col_gen, _ = st.columns([1, 4])
with col_gen:
    generate_clicked = st.button("🪄 NewtonX で生成", type="primary", disabled=not draft_text.strip())

if generate_clicked:
    with st.spinner("NewtonX に生成を依頼中..."):
        try:
            ja_catalog = blog_repo.build_catalog("ja")
            en_catalog = blog_repo.build_catalog("en")
            prompt_text = prompts.build_prompt(
                draft_text=draft_text,
                ja_catalog=ja_catalog,
                en_catalog=en_catalog,
                date_hint=post_date.isoformat(),
            )
            chat_uid, raw_response = newtonx_gen.generate_raw(
                client,
                assistant_uid=selected_assistant["uid"],
                prompt=prompt_text,
                web_search=web_search,
                knowledge_search=knowledge_search,
            )
            parsed = newtonx_gen.extract_json_object(raw_response)
            st.session_state.generated = parsed
            st.session_state.raw_response = raw_response
            st.session_state.chat_uid = chat_uid
            st.session_state.slug = parsed.get("slug_suggestion", "")
            st.success(f"生成完了（chat_uid: {chat_uid}）")
        except Exception as e:  # noqa: BLE001
            st.error(f"生成に失敗しました: {e}")
            st.code(traceback.format_exc())

# --- レビュー・編集 ---------------------------------------------------------------
if "generated" in st.session_state:
    st.subheader("2. レビュー・編集")

    slug = st.text_input("URL slug（英小文字+ハイフン。日付は自動付与）", value=st.session_state.get("slug", ""))
    st.session_state.slug = slug

    existing_ja_stems = blog_repo.existing_stems("ja")
    existing_en_stems = blog_repo.existing_stems("en")

    tab_ja, tab_en = st.tabs(["🇯🇵 日本語版", "🇬🇧 English"])

    edited = {}
    for tab, lang, existing_stems in [(tab_ja, "ja", existing_ja_stems), (tab_en, "en", existing_en_stems)]:
        with tab:
            data = st.session_state.generated.get(lang, {})
            title = st.text_input("title", value=data.get("title", ""), key=f"{lang}_title")
            description = st.text_area("description", value=data.get("description", ""), key=f"{lang}_desc", height=80)
            tags_raw = st.text_input(
                "tags（カンマ区切り）",
                value=", ".join(data.get("tags", [])),
                key=f"{lang}_tags",
            )
            tags = [t.strip() for t in tags_raw.split(",") if t.strip()]
            body = st.text_area("body（Markdown）", value=data.get("body", ""), key=f"{lang}_body", height=400)

            edited[lang] = {"title": title, "description": description, "tags": tags, "body": body}

            filename_preview = f"{post_date:%Y%m%d}-{slug or '{slug}'}.md"
            st.caption(f"書き込み先: src/content/blog/{lang}/{filename_preview}")

            st.markdown("**チェック結果**")
            results = checks.run_all_checks(
                title=title,
                description=description,
                tags=tags,
                slug=slug or "dummy-slug",
                body=body,
                lang=lang,
                existing_stems=existing_stems,
            )
            for r in results:
                icon = "✅" if r.ok else "⚠️"
                st.write(f"{icon} {r.label} — {r.detail}")

    st.session_state.edited = edited

    with st.expander("NewtonX の生の応答を見る（デバッグ用）"):
        st.text(st.session_state.get("raw_response", ""))

    # --- 書き込み --------------------------------------------------------------
    st.subheader("3. ファイル書き込み")

    slug_ok = bool(slug) and checks.check_slug(slug).ok
    all_ok = slug_ok and blog_repo.is_date_available(post_date)
    if not all_ok:
        st.warning("slug が未入力/不正、または日付が重複しています。書き込み前に修正してください。")

    if st.button("💾 src/content/blog/ に書き込む", disabled=not all_ok):
        try:
            written = []
            for lang in ("ja", "en"):
                data = st.session_state.edited[lang]
                path = blog_repo.write_post(
                    lang=lang,
                    date=post_date,
                    short_slug=slug,
                    title=data["title"],
                    description=data["description"],
                    tags=data["tags"],
                    body=data["body"],
                )
                written.append(path)
            st.session_state.written_paths = written
            st.success("書き込み完了:\n" + "\n".join(str(p) for p in written))
        except FileExistsError as e:
            st.error(str(e))

    if st.session_state.get("written_paths"):
        st.subheader("4. 検証")
        if st.button("✅ npm test -- blog-calendar を実行"):
            with st.spinner("実行中..."):
                code, output = blog_repo.run_npm(["test", "--", "blog-calendar"])
            st.code(output)
            st.write("✅ 成功" if code == 0 else "❌ 失敗")

        col_a, col_b = st.columns(2)
        with col_a:
            if st.button("astro check を実行"):
                with st.spinner("実行中..."):
                    code, output = blog_repo.run_npx(["astro", "check"])
                st.code(output[-4000:])
                st.write("✅ 成功" if code == 0 else "❌ 失敗")
        with col_b:
            if st.button("npm run build を実行"):
                with st.spinner("実行中（数十秒かかります）..."):
                    code, output = blog_repo.run_npm(["run", "build"], timeout=600)
                st.code(output[-4000:])
                st.write("✅ 成功" if code == 0 else "❌ 失敗")

        st.subheader("5. git status（確認用）")
        st.code(blog_repo.git_status() or "(差分なし)")
        st.info(
            "commit と push はこのツールでは行いません。"
            "CLAUDE.md のルール通り、内容を確認のうえユーザーが手動で実施してください。"
        )
