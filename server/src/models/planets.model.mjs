import { parse } from 'csv-parse';
import fs from 'fs';

async function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36  && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}
const habitablePlanets = [];

export async function loadPlanetsData() {
    const parser = fs.createReadStream('src/data/kepler_data.csv')
        .pipe(parse({
            comment: '#',
            columns: true,
        }));

    try {
        for await (const data of parser) {
            if (await isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        }

        console.log(`${habitablePlanets.length} habitable planets found!`);
        // console.log(habitablePlanets.map(p => p.kepler_name));
    } catch (err) {
        console.error('Error while parsing:', err);
        throw err;
    }
}

export function getAllPlanets() {
    return habitablePlanets
}