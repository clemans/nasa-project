import { parse } from 'csv-parse';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

export async function loadPlanetsData() {
  const dataFileURL = new URL('../data/kepler_data.csv', import.meta.url);

  const parser = fs.createReadStream(fileURLToPath(dataFileURL))
    .pipe(parse({
      comment: '#',
      columns: true,
    }));

  try {
    for await (const planet of parser) {
      if (isHabitablePlanet(planet)) {
        habitablePlanets.push(planet);
      }
    }

    console.log(`${habitablePlanets.length} habitable planets found!`);
  } catch (err) {
    console.error('Error while parsing:', err);
    throw err;
  }
}

export function getAllPlanets() {
  return habitablePlanets;
}