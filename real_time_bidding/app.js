const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
 // Adjusted path and filename for consistency

const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');

const app = express();

// Require the database connection
require('./database');

const port = process.env.PORT || 3004;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Authentication middleware
app.use(authenticateJWT);

// User routes
app.use('/api/users', userRoutes);

// Item routes
app.use('/api', itemRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error'); // Assuming you have an error handling template (e.g., error.ejs)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
