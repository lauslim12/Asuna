// Third party imports.
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// Application Setup.
const app = express();

// Global Middlewares.
// Security Headers
app.use(helmet());

// Body Parser
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Sanitize inputs (NoSQL query attacks)
app.use(mongoSanitize());

// Sanitize inputs (XSS)
app.use(xss());

// Preventing parameter tampering
app.use(hpp());

// Rate Limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests! Please try again in an hour!',
});

// Development Logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Compress the responses
app.use(compression());

// Routing
app.use('/api', limiter);

module.exports = app;
