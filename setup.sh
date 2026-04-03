#!/bin/bash
# Claude Code Level 5 テンプレート セットアップスクリプト
#
# 使い方:
#   cd /path/to/new-repo
#   bash /path/to/ClaudeCodeTemplate/setup.sh
#
# 対話形式でプロジェクト固有の設定を入力し、テンプレートを適用します。

set -e

TEMPLATE_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="$(pwd)"

echo "=== Claude Code Level 5 セットアップ ==="
echo "テンプレート: $TEMPLATE_DIR"
echo "適用先:       $TARGET_DIR"
echo ""

# 既存ファイルの確認
if [ -d "$TARGET_DIR/.claude" ] || [ -f "$TARGET_DIR/CLAUDE.md" ]; then
  read -p "既存の .claude/ または CLAUDE.md が見つかりました。上書きしますか？ (y/n): " OVERWRITE
  if [ "$OVERWRITE" != "y" ]; then
    echo "キャンセルしました。"
    exit 0
  fi
fi

# プロジェクト情報の入力
read -p "プロジェクト名 (例: ユメログ): " PROJECT_NAME
read -p "技術スタック (例: Flutter / Dart): " TECH_STACK
read -p "テストコマンド (例: flutter test): " TEST_COMMAND
read -p "静的解析コマンド (例: flutter analyze): " ANALYZE_COMMAND
read -p "ビルドコマンド (例: flutter build web): " BUILD_COMMAND
read -p "フォーマットコマンド (例: dart format --fix): " FORMAT_COMMAND
read -p "プロジェクトの絶対パス: " PROJECT_DIR

echo ""
echo "--- 設定内容 ---"
echo "プロジェクト名:       $PROJECT_NAME"
echo "技術スタック:         $TECH_STACK"
echo "テストコマンド:       $TEST_COMMAND"
echo "静的解析コマンド:     $ANALYZE_COMMAND"
echo "ビルドコマンド:       $BUILD_COMMAND"
echo "フォーマットコマンド: $FORMAT_COMMAND"
echo "プロジェクトパス:     $PROJECT_DIR"
echo ""
read -p "この内容でセットアップしますか？ (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
  echo "キャンセルしました。"
  exit 0
fi

# テンプレートをコピー（setup.sh と README.md はコピーしない）
echo ""
echo "テンプレートをコピー中..."
cp -r "$TEMPLATE_DIR/.claude" "$TARGET_DIR/"
cp "$TEMPLATE_DIR/CLAUDE.md" "$TARGET_DIR/"

# プレースホルダを置換
echo "プレースホルダを置換中..."
find "$TARGET_DIR/.claude" "$TARGET_DIR/CLAUDE.md" -type f \( -name "*.md" -o -name "*.json" \) | while read file; do
  sed -i "s|{{PROJECT_NAME}}|$PROJECT_NAME|g" "$file"
  sed -i "s|{{TECH_STACK}}|$TECH_STACK|g" "$file"
  sed -i "s|{{TEST_COMMAND}}|$TEST_COMMAND|g" "$file"
  sed -i "s|{{ANALYZE_COMMAND}}|$ANALYZE_COMMAND|g" "$file"
  sed -i "s|{{BUILD_COMMAND}}|$BUILD_COMMAND|g" "$file"
  sed -i "s|{{FORMAT_COMMAND}}|$FORMAT_COMMAND|g" "$file"
  sed -i "s|{{PROJECT_DIR}}|$PROJECT_DIR|g" "$file"
done

echo ""
echo "=== セットアップ完了 ==="
echo ""
echo "作成されたファイル:"
echo "  $TARGET_DIR/CLAUDE.md"
echo "  $TARGET_DIR/.claude/settings.json"
echo "  $TARGET_DIR/.claude/skills/ (4スキル)"
echo "  $TARGET_DIR/.claude/agents/ (3エージェント)"
echo ""
echo "次のステップ:"
echo "  1. CLAUDE.md をプロジェクトに合わせて調整"
echo "  2. 不要なスキル/エージェントがあれば削除"
echo "  3. Claude Code でセッションを開始"
