const VALID_SOURCES = ['meta', 'google', 'tiktok', 'manual']
const VALID_STATUSES = ['new', 'qualified', 'booked', 'converted', 'lost']

/**
 * Validates request body for creating a lead (POST /api/leads)
 */
const validateCreateLead = (req, res, next) => {
  const { name, email, source, score } = req.body
  const errors = []

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Field "name" is required and must be a non-empty string.')
  }

  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Field "email" is required and must be a valid email address.')
  }

  if (source && !VALID_SOURCES.includes(source)) {
    errors.push(`Field "source" must be one of: ${VALID_SOURCES.join(', ')}.`)
  }

  if (score !== undefined && (typeof score !== 'number' || score < 0 || score > 100)) {
    errors.push('Field "score" must be a number between 0 and 100.')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    })
  }

  next()
}

/**
 * Validates request body for updating a lead (PATCH /api/leads/:id)
 */
const validateUpdateLead = (req, res, next) => {
  const { status, score, notes } = req.body
  const errors = []

  // Must have at least one updatable field
  if (status === undefined && score === undefined && notes === undefined) {
    errors.push('At least one field is required to update: status, score, or notes.')
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`Field "status" must be one of: ${VALID_STATUSES.join(', ')}.`)
  }

  if (score !== undefined && (typeof score !== 'number' || score < 0 || score > 100)) {
    errors.push('Field "score" must be a number between 0 and 100.')
  }

  if (notes !== undefined && typeof notes !== 'string') {
    errors.push('Field "notes" must be a string.')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    })
  }

  next()
}

module.exports = { validateCreateLead, validateUpdateLead }
