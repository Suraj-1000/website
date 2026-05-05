const ApiResponse = require('./response.util');

/**
 * Middleware to validate request body against a set of rules.
 * @param {Object} schema - Validation rules
 */
const validate = (schema) => {
    return (req, res, next) => {
        const errors = [];
        const body = req.body;

        Object.keys(schema).forEach((field) => {
            const rules = schema[field];
            const value = body[field];

            if (rules.required && (value === undefined || value === null || value === '')) {
                errors.push(`${field} is required`);
            }

            if (value !== undefined && value !== null && value !== '') {
                if (rules.type && typeof value !== rules.type) {
                    errors.push(`${field} must be of type ${rules.type}`);
                }
                if (rules.min && value.length < rules.min) {
                    errors.push(`${field} must be at least ${rules.min} characters`);
                }
                if (rules.max && value.length > rules.max) {
                    errors.push(`${field} must be no more than ${rules.max} characters`);
                }
                if (rules.pattern && !rules.pattern.test(value)) {
                    errors.push(`${field} format is invalid`);
                }
            }
        });

        if (errors.length > 0) {
            return ApiResponse.error(res, errors.join(', '), 400);
        }

        next();
    };
};

module.exports = validate;
