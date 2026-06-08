/**
 * Retry a function with exponential backoff
 * @param {Function} fn - The async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in ms
 * @param {number} maxDelay - Maximum delay in ms
 * @returns {Promise} - Result of the function
 */
async function retryWithBackoff(
  fn,
  maxRetries = 3,
  initialDelay = 1000,
  maxDelay = 30000
) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if error is rate limit (429) or server error (5xx)
      const statusCode = error.response?.status;
      const isRetryable =
        statusCode === 429 ||
        statusCode === 503 ||
        statusCode === 502 ||
        statusCode === 500 ||
        !statusCode; // Network errors

      if (!isRetryable || attempt === maxRetries - 1) {
        throw error;
      }

      // Calculate exponential backoff with jitter
      const exponentialDelay = Math.min(
        initialDelay * Math.pow(2, attempt),
        maxDelay
      );
      const jitter = Math.random() * 0.1 * exponentialDelay;
      const delay = exponentialDelay + jitter;

      console.warn(
        `[retry] Attempt ${attempt + 1} failed with status ${statusCode}. Retrying in ${delay.toFixed(0)}ms...`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw lastError;
}

module.exports = {
  retryWithBackoff,
};