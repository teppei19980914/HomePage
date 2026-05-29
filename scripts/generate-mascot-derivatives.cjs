/**
 * たすきフクロウ派生アイコン生成スクリプト (HomePage / Astro 用)
 *
 * 用途: docs/design/assets/mascot-owl-source.png (1254×1254 元画像) から
 *   たすきば紹介ページ/記事本文に挿入する画像を生成する。
 *
 * 出力:
 *   - public/mascot-owl.png         512×512   たすきば製品ページ / 記事本文の挿絵
 *
 * 注意: ホームページのファビコン/OG 画像は意図的に未設定 (2026-05-29)。
 *   たすきば製品マスコットを個人ホームページの顔として使わない方針のため、
 *   favicon / apple-touch-icon / og-image の生成は行わない。
 *
 * 再実行:
 *   $ node scripts/generate-mascot-derivatives.cjs
 *
 * 依存:
 *   sharp
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs/design/assets/mascot-owl-source.png');

async function writePng(buf, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  const meta = await sharp(outPath).metadata();
  const stat = fs.statSync(outPath);
  console.log(`  ${path.relative(ROOT, outPath)}  ${meta.width}x${meta.height}  ${(stat.size / 1024).toFixed(1)} KB`);
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`元画像が見つかりません: ${SRC}`);
    process.exit(1);
  }

  const srcBuf = fs.readFileSync(SRC);
  const srcMeta = await sharp(srcBuf).metadata();
  console.log(`source: ${srcMeta.width}x${srcMeta.height} ${srcMeta.format} (${(srcBuf.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log('--- 出力 ---');

  // 汎用 512x512 (たすきば紹介ページ / 記事本文の挿絵)
  await writePng(
    await sharp(srcBuf).resize(512, 512, { fit: 'cover' }).png({ palette: false, compressionLevel: 9 }).toBuffer(),
    path.join(ROOT, 'public/mascot-owl.png'),
  );

  console.log('\n完了。');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
