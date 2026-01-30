const asyncHandler = require('../middlewares/asyncHandler');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    try {
        const user = await authService.loginUser(email, password);
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
});

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Public
exports.refresh = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ success: false, error: 'Refresh token not found' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await authService.getUserById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await authService.getUserById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create Access Token
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE
    });

    // Create Refresh Token
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE
    });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    };

    const refreshCookieOptions = {
        ...cookieOptions,
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days (matching JWT_REFRESH_EXPIRE)
        ),
    };

    res
        .status(statusCode)
        .cookie('refreshToken', refreshToken, refreshCookieOptions)
        .json({
            success: true,
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};
