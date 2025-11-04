const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');
const connectToDatabase = require('./models/db');

const app = express();
app.use("*", cors());
const port = 3060;

connectToDatabase()
  .then(() => pinoLogger.info('Connected to DB'))
  .catch((e) => console.error('Failed to connect to DB', e));

app.use(express.json());

// Import routes
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes'); // if you have search

// Logger middleware
const pinoHttp = require('pino-http');
app.use(pinoHttp({ logger: pinoLogger }));

// Use routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes); // optional

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.get("/", (req, res) => res.send("Inside the server"));

app.listen(port, () => console.log(`Server running on port ${port}`));
