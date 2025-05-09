import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { planetsRouter } from './routes/planets/planets.router.mjs';
import { launchesRouter } from './routes/launches/launches.router.mjs';

const FE_URL = process.env.FE_URL || 'http://localhost:3000';

const app = express();
app.use(cors({ origin: FE_URL }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('public'));
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.get('/:wildcard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

export default app;