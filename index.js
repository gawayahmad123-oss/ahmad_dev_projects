require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const usersRouter = require('./routes/users');
const client = require('prom-client');

const app = express();
app.use(express.json());

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/users', usersRouter);

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const port = process.env.PORT || 3000;
async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

if (require.main === module) start();

module.exports = app;
