const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const { User } = require('../database/models');
const ApiResponse = require('../utils/response.util');
const { envConfig } = require('../config');

/**
 * Middleware to check if the user is authenticated via JWT.
 */
exports.checkAuth = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return ApiResponse.error(res, 'Not authorized to access this route', 401);
    }

    try {
        const decoded = jwt.verify(token, envConfig.JWT.SECRET);

        req.user = await User.findByPk(decoded.id);

        if (!req.user) {
            return ApiResponse.error(res, 'User not found', 401);
        }

        next();
    } catch (err) {
        return ApiResponse.error(res, 'Not authorized to access this route', 401);
    }
});

/**
 * Middleware to restrict access to specific roles.
 * @param {...string} roles - Allowed roles
 */
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return ApiResponse.error(res, `User role ${req.user.role} is not authorized to access this route`, 403);
        }
        next();
    };
};
