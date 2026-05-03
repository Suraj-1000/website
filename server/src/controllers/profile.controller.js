const asyncHandler = require('../middlewares/asyncHandler');
const profileService = require('../services/profile.service');
const ApiResponse = require('../utils/response.util');

/**
 * Controller for managing user profile information.
 * Handles fetching and updating the single profile record.
 */
class ProfileController {
    /**
     * @desc    Get the user profile
     * @route   GET /api/v1/profile
     * @access  Public
     */
    get = asyncHandler(async (req, res) => {
        const profile = await profileService.getProfile();
        return ApiResponse.success(res, profile);
    });

    /**
     * @desc    Create or update the user profile
     * @route   POST /api/v1/profile
     * @access  Private/Admin
     */
    upsert = asyncHandler(async (req, res) => {
        const profile = await profileService.upsertProfile(req.body);
        return ApiResponse.success(res, profile, 'Profile updated successfully');
    });
}

module.exports = new ProfileController();
