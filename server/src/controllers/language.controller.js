const asyncHandler = require('../middlewares/asyncHandler');
const languageService = require('../services/language.service');
const { NotFoundException } = require('../exceptions/error.exception');

class LanguageController {
   getAll = asyncHandler(async (req, res) => {
      const languages = await languageService.findAll();
      res.status(200).json({ success: true, count: languages.length, data: languages });
   });

   create = asyncHandler(async (req, res) => {
      const language = await languageService.create(req.body);
      res.status(201).json({ success: true, data: language });
   });

   update = asyncHandler(async (req, res) => {
      const language = await languageService.update(req.params.id, req.body);
      if (!language) throw new NotFoundException('Language not found');
      res.status(200).json({ success: true, data: language });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await languageService.delete(req.params.id);
      if (!result) throw new NotFoundException('Language not found');
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new LanguageController();
