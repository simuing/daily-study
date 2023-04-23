import express from 'express';

import connectToDatabase from './helpers.mjs'

const app = express();

app.get('/', (req, res) => {
  res.send('<h2>Hi there!</h2>');
});

app.get('/api/healthcheck', (req, res) => {
  res.send('OK');
});

await connectToDatabase();

app.listen(8080);