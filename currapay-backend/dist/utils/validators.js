"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateTransaction = exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
// Middleware for user validation
exports.validateUser = [
    (0, express_validator_1.body)('emailAddress').isEmail(),
    (0, express_validator_1.body)('age').isInt({ min: 0 }),
];
// Middleware for transaction validation
exports.validateTransaction = [
    (0, express_validator_1.body)('amount').isFloat({ min: 0 }),
    (0, express_validator_1.body)('currency').isString(),
];
// Error handling for validation results
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
