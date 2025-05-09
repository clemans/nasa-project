import { addNewLaunch, getAllLaunches } from '../../models/launches.model.mjs';

export function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.destination || !launch.launchDate) {
        return res.status(400).json({
            error: "Invalid or missing property input."
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid Date input"
        })
    }
    addNewLaunch(launch);   
    return res.status(201).json(launch);
}

export function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}