#!/usr/bin/env node

import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const INPUT_DIR = join(ROOT, "public/images");
const OUTPUT_DIR = join(ROOT, "public/images/opt");
const PLACEHOLDERS_FILE = join(ROOT, "lib/image-placeholders.ts");

const PHOTO_MAX = 1280;
const LOGO_MAX = 320;
const PHOTO_QUALITY = 72;
const LOGO_QUALITY = 80;

const LOGO_PATTERN = /logo|eslogan|emblem|bull|icon|tasca|navbar|nav/i;

mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR).filter((file) =>
  /\.(jpe?g|png)$/i.test(file)
);

const placeholders = {};

for (const file of files) {
  const inputPath = join(INPUT_DIR, file);
  const base = basename(file, extname(file));
  const outputPath = join(OUTPUT_DIR, `${base}.webp`);
  const isLogo = LOGO_PATTERN.test(file);
  const maxWidth = isLogo ? LOGO_MAX : PHOTO_MAX;

  const pipeline = sharp(inputPath).rotate().resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  await pipeline
    .webp({
      quality: isLogo ? LOGO_QUALITY : PHOTO_QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);

  const blurBuffer = await sharp(inputPath)
    .rotate()
    .resize(isLogo ? 16 : 24, undefined, { withoutEnlargement: true })
    .webp({ quality: 25 })
    .toBuffer();

  placeholders[base] =
    `data:image/webp;base64,${blurBuffer.toString("base64")}`;

  const meta = await sharp(outputPath).metadata();
  const inputStats = await sharp(inputPath).metadata();
  console.log(
    `✓ ${file} → opt/${base}.webp (${inputStats.width}→${meta.width}px, q${isLogo ? LOGO_QUALITY : PHOTO_QUALITY})`
  );
}

const placeholderEntries = Object.entries(placeholders)
  .map(
    ([key, value]) =>
      `  ${JSON.stringify(key)}: ${JSON.stringify(value)},`
  )
  .join("\n");

writeFileSync(
  PLACEHOLDERS_FILE,
  `/** Generado por npm run optimize:media — no editar a mano */\n\nexport const imagePlaceholders: Record<string, string> = {\n${placeholderEntries}\n};\n\nexport function getImagePlaceholder(key: string): string | undefined {\n  return imagePlaceholders[key];\n}\n`,
  "utf8"
);

console.log(`\n✓ Placeholders → lib/image-placeholders.ts (${files.length} imágenes)`);
