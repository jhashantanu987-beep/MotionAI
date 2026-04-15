/**
 * Global Error Handler Middleware
 * Must be registered LAST in app.js with 4 arguments (err, req, res, next)
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`)

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({
      success: false,
      message: 'Mongoose validation error.',
      errors: messages,
    })
  }

  // Mongoose duplicate key error (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(409).json({
      success: false,
      message: `Duplicate value: a record with this "${field}" already exists.`,
    })
  }

  // Mongoose bad ObjectId (e.g., /api/leads/not-a-real-id)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: "${err.value}"`,
    })
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An unexpected internal error occurred. Please contact support.' : err.message;

  res.status(statusCode).json({
    success: false,
    message: message
  })
}

module.exports = errorHandler
