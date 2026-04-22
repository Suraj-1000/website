const asyncHandler = require('../middlewares/asyncHandler');
const profileService = require('../services/profile.service');

class ProfileController {
   get = asyncHandler(async (req, res) => {
      const profile = await profileService.getProfile();
      res.status(200).json({ success: true, data: profile });
   });

   upsert = asyncHandler(async (req, res) => {
      const profile = await profileService.upsertProfile(req.body);
      res.status(200).json({ success: true, data: profile });
   });
}

module.exports = new ProfileController();
