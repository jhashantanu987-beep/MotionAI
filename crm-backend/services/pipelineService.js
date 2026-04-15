// Pipeline: defines valid status transitions
const ALLOWED_TRANSITIONS = {
  new: ['qualified', 'lost'],
  qualified: ['booked', 'lost'],
  booked: ['converted', 'lost'],
  converted: [], // terminal state
  lost: [],      // terminal state
}

/**
 * Validates if a status transition is allowed in the lead pipeline.
 * @param {string} oldStatus - Current status of the lead
 * @param {string} newStatus - Desired new status
 * @throws {Error} if transition is not allowed
 */
const validateStatusTransition = (oldStatus, newStatus) => {
  // Same status is a no-op, always allowed
  if (oldStatus === newStatus) return true

  const allowed = ALLOWED_TRANSITIONS[oldStatus]

  if (!allowed) {
    throw new Error(`Unknown current status: "${oldStatus}"`)
  }

  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Invalid pipeline transition: "${oldStatus}" → "${newStatus}". ` +
      `Allowed transitions from "${oldStatus}": [${allowed.join(', ') || 'none'}]`
    )
  }

  return true
}

module.exports = { validateStatusTransition }
