/**
 * Consistent API response formatter
 */
class ApiResponse {
    /**
     * Send a success response
     * @param {Object} res - Express response object
     * @param {any} data - Data to send
     * @param {string} message - Success message
     * @param {number} statusCode - HTTP status code
     */
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Send an error response
     * @param {Object} res - Express response object
     * @param {string} error - Error message
     * @param {number} statusCode - HTTP status code
     */
    static error(res, error = 'Internal Server Error', statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            error,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = ApiResponse;
