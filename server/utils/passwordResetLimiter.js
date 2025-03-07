import rateLimit from 'express-rate-limit';

export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 requests per hour
    message: {
      success: false,
      message: "Too many password reset attempts. Please try again in an hour."
    }
});