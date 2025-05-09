import express from 'express';

import { httpAddNewLaunch, httpGetAllLaunches } from './launches.controller.mjs';

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
export {
    launchesRouter  
};
