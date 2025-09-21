// errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // Log the error for server-side debugging
  console.error('An error occurred:', err);
  console.error('Stack trace:', err.stack);

  // Set a default status code and message
  const statusCode = err.status || 500;
  let message = err.message || 'Server Error';

  // Handle specific MongoDB or Mongoose errors for a better client-side experience
  if (err.name === 'CastError') {
    message = `Invalid ID: ${err.value}`;
    statusCode = 400; // Bad request
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    message = 'Duplicate key error: A user with this email already exists.';
    statusCode = 409; // Conflict
  }

  // Handle validation errors from Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Validation Error: ${errors.join(', ')}`;
    statusCode = 400; // Bad request
  }

  // Send the enhanced error response to the client
  res.status(statusCode).json({
    success: false,
    message: message,
    // In development, you might want to send the stack trace for debugging
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default errorHandler;