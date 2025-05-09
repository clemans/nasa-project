import { getAllPlanets } from '../../models/planets.model.mjs';

export function httpGetAllPlanets(req, res) {
    return res.status(200).json(getAllPlanets());
}