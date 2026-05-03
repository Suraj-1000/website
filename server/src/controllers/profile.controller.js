const asyncHandler = require('../middlewares/asyncHandler');
const profileService = require('../services/profile.service');

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
        res.status(200).json({ success: true, data: profile });
    });

    /**
     * @desc    Create or update the user profile
     * @route   POST /api/v1/profile
     * @access  Private/Admin
     */
    upsert = asyncHandler(async (req, res) => {
        const profile = await profileService.upsertProfile(req.body);
        res.status(200).json({ success: true, data: profile });
    });
}

module.exports = new ProfileController();
