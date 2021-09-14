/* eslint-disable no-console */
/* eslint-disable no-process-exit */

// Third party imports.
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Setup environment variables.
dotenv.config();

// Handle uncaught exceptions. Happens synchronously!
process.on('uncaughtException', (err) => {
  console.log('Unhandled exception 💥! Application shutting down!');
  console.log(err.name, err.message);
  process.exit(1);
});

// Server Setup
const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDB connection successfull! 🔥');
  })
  .catch((err) => {
    console.log(`Error found! Error: ${err}`);
  });

const server = app.listen(PORT, () => {
  console.log(`Application running on Express.js on port ${PORT}! 👍`);
});

// Handle unhandled rejections --- the middleware stack will end here.
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection 💥! Application shutting down!');
  console.log(err.name, err.message);

  // Finish all requests that are still pending, the shutdown gracefully.
  server.close(() => {
    process.exit(1);
  });
});
