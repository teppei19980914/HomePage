/**
 * たすきフクロウ派生アイコン生成スクリプト (HomePage / Astro 用)
 *
 * 用途: docs/design/assets/mascot-owl-source.png (1254×1254 元画像) から
 *   LP で使う派生画像を生成する。
 *
 * 出力:
 *   - public/mascot-owl.png         512×512   Header ロゴ / hero 等の汎用利用
 *   - public/favicon-32.png         32×32     <link rel="icon" type="image/png">
 *   - public/apple-touch-icon.png   180×180   iOS apple-touch-icon
 *   - public/og-image.png           1200×630  SNS シェア用 OG image (合成、本リポ BMP と同じレイアウト)
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

  // 1) 汎用 512x512 (Header / hero)
  await writePng(
    await sharp(srcBuf).resize(512, 512, { fit: 'cover' }).png({ palette: false, compressionLevel: 9 }).toBuffer(),
    path.join(ROOT, 'public/mascot-owl.png'),
  );

  // 2) Favicon — PNG 32x32 (modern browsers サポート)
  await writePng(
    await sharp(srcBuf).resize(32, 32, { fit: 'cover' }).png({ palette: false, compressionLevel: 9 }).toBuffer(),
    path.join(ROOT, 'public/favicon-32.png'),
  );

  // 3) Apple touch icon 180x180
  await writePng(
    await sharp(srcBuf).resize(180, 180, { fit: 'cover' }).png({ palette: false, compressionLevel: 9 }).toBuffer(),
    path.join(ROOT, 'public/apple-touch-icon.png'),
  );

  // 4) OG image 1200x630 (BMP リポと同じレイアウト)
  const LOGO = 560;
  const logoBuf = await sharp(srcBuf).resize(LOGO, LOGO, { fit: 'cover' }).png().toBuffer();
  const ogSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <style>
    .name { font: 700 88px 'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif; fill: #1a3a8a; }
    .sub { font: 600 36px 'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif; fill: #3a5a9a; }
    .tag { font: 400 28px 'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif; fill: #3a5a9a; }
  </style>
  <text x="640" y="270" class="name">たすきば</text>
  <text x="640" y="340" class="sub">Knowledge Relay</text>
  <text x="640" y="410" class="tag">プロジェクトの知見を、</text>
  <text x="640" y="450" class="tag">次の判断へ。</text>
</svg>`);

  const og = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 217, g: 236, b: 247 },
    },
  })
    .composite([
      { input: logoBuf, top: 35, left: 35 },
      { input: ogSvg, top: 0, left: 0 },
    ])
    .png({ palette: false, compressionLevel: 9 })
    .toBuffer();
  await writePng(og, path.join(ROOT, 'public/og-image.png'));

  console.log('\n完了。');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
