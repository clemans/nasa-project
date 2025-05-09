import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NASA_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+cumulative&format=csv';
const FILE_PATH = path.resolve(__dirname, '../data/kepler_data.csv');

export async function fetchPlanetsCSV() {
  const res = await fetch(NASA_URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  await pipeline(res.body, fs.createWriteStream(FILE_PATH));
  console.log(`✅ CSV downloaded to ${FILE_PATH}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await fetchPlanetsCSV();
}
