const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    if (process.env.NODE_ENV !== 'production') {
        console.error(err);
    }

    // Sequelize validation handling
    if (err.name === 'SequelizeValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = { message, statusCode: 400 };
    }

    // Sequelize unique constraint handling
    if (err.name === 'SequelizeUniqueConstraintError') {
        const message = 'Duplicate field value entered';
        error = { message, statusCode: 400 };
    }

    // JWT Error Handling
    if (err.name === 'JsonWebTokenError') {
        error = { message: 'Not authorized to access this route', statusCode: 401 };
    }

    if (err.name === 'TokenExpiredError') {
        error = { message: 'Session expired, please login again', statusCode: 401 };
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
