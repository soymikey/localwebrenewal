import { mkdir, readFile, writeFile } from "node:fs/promises";

const DATA_PATH = "data/menu-data.json";
const IMAGE_DIR = "data/images";

const data = JSON.parse(await readFile(DATA_PATH, "utf8"));
await mkdir(IMAGE_DIR, { recursive: true });

let downloaded = 0;
let failed = 0;

for (const item of data.items) {
  const localImage = `${IMAGE_DIR}/${item.id}.jpg`;
  try {
    const response = await fetch(item.imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    await writeFile(localImage, bytes);
    item.localImage = localImage;
    downloaded += 1;
  } catch (error) {
    item.localImage = "";
    item.imageDownloadError = String(error.message ?? error);
    failed += 1;
  }
}

data.restaurant.imagesDownloadedAt = new Date().toISOString();
await writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`);

console.log(`Downloaded ${downloaded} images to ${IMAGE_DIR}`);
if (failed > 0) {
  console.log(`Failed to download ${failed} images`);
}
