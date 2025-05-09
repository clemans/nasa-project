import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';

const NASA_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+cumulative&format=csv';

// Define a file URL relative to this module
const fileURL = new URL('../data/kepler_data.csv', import.meta.url);
const dirURL = new URL('../data/', import.meta.url);

export async function fetchPlanetsCSV() {
  const res = await fetch(NASA_URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

  // Ensure the directory exists
  await fs.promises.mkdir(dirURL, { recursive: true });

  // Write the CSV stream to file
  await pipeline(res.body, fs.createWriteStream(fileURL));
  console.log(`✅ CSV downloaded to ${fileURL.pathname}`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await fetchPlanetsCSV();
}
