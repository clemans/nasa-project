import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { planetsRouter } from './routes/planets/planets.router.mjs';
import { launchesRouter } from './routes/launches/launches.router.mjs';

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001'
];

const app = express();
app.use(cors({ origin: allowedOrigins }));
app.use(morgan('combined'));
app.use(express.json());

// Serve static files from 'public' directory using a URL path
const publicDir = new URL('../public/', import.meta.url);
app.use(express.static(fileURLToPath(publicDir)));

// API routes
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

// Handle client-side routing fallback
app.get('/:wildcard', (req, res) => {
  const indexFile = new URL('../public/index.html', import.meta.url);
  res.sendFile(fileURLToPath(indexFile));
});

export default app;
