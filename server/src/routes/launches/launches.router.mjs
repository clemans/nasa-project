import express from 'express';

import { httpAbortLaunch, httpAddNewLaunch, httpGetAllLaunches } from './launches.controller.mjs';

const launchesRouter = express.Router();

launchesRouter.delete('/:id', httpAbortLaunch);
launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
export {
    launchesRouter  
};
