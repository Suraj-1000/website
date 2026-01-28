const languageService = require('../services/language.service');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getLanguages = asyncHandler(async (req, res, next) => {
    const languages = await languageService.getAllLanguages();
    res.status(200).json({ success: true, count: languages.length, data: languages });
});

exports.createLanguage = asyncHandler(async (req, res, next) => {
    const language = await languageService.addLanguage(req.body);
    res.status(201).json({ success: true, data: language });
});

exports.updateLanguage = asyncHandler(async (req, res, next) => {
    const language = await languageService.updateLanguage(req.params.id, req.body);
    if (!language) {
        return res.status(404).json({ success: false, error: 'Language not found' });
    }
    res.status(200).json({ success: true, data: language });
});

exports.deleteLanguage = asyncHandler(async (req, res, next) => {
    const success = await languageService.deleteLanguage(req.params.id);
    if (!success) {
        return res.status(404).json({ success: false, error: 'Language not found' });
    }
    res.status(200).json({ success: true, data: {} });
});
