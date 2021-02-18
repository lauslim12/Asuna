// Third party imports.
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// Routing
const employeeRouter = require('./routes/employeeRoutes');
const floorRouter = require('./routes/floorRoutes');
const roomRouter = require('./routes/roomRoutes');
const userRouter = require('./routes/userRoutes');

// Utilities
const AppError = require('./utils/appError');

// Middlewares
const errorMiddleware = require('./middlewares/errorMiddleware');

// Application Setup.
const app = express();

// Global Middlewares.
// Enable CORS (Access-Control-Allow-Origin: *)
app.use(cors());

// Security Headers
app.use(helmet());

// Body Parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
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
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/floors', floorRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/users', userRouter);

// Defining undefined routes.
// If we are able to reach this point - then no route match.
// If we are able to reach other routes - then the request - response cycle would have been finished in the routes.
// If next() is passed anything - Express will assume that it is an error.
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Middleware for error handling.
app.use(errorMiddleware);

module.exports = app;
