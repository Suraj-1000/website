const asyncHandler = require('@/middlewares/asyncHandler');
const languageService = require('@/services/language.service');

class LanguageController {
   getLanguages = asyncHandler(async (req, res) => {
      const languages = await languageService.findAll();
      res.status(200).json({ success: true, count: languages.length, data: languages });
   });

   createLanguage = asyncHandler(async (req, res) => {
      const language = await languageService.create(req.body);
      res.status(201).json({ success: true, data: language });
   });

   updateLanguage = asyncHandler(async (req, res) => {
      const language = await languageService.update(req.params.id, req.body);
      if (!language) return res.status(404).json({ success: false, error: 'Language not found' });
      res.status(200).json({ success: true, data: language });
   });

   deleteLanguage = asyncHandler(async (req, res) => {
      const result = await languageService.delete(req.params.id);
      if (!result) return res.status(404).json({ success: false, error: 'Language not found' });
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new LanguageController();
