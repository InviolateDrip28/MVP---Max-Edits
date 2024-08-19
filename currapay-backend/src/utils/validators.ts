import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware for user validation
export const validateUser = [
    body('emailAddress').isEmail(),
    body('age').isInt({ min: 0 }),
];

// Middleware for transaction validation
export const validateTransaction = [
    body('amount').isFloat({ min: 0 }),
    body('currency').isString(),
];

// Error handling for validation results
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
