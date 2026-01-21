const educationService = require('../services/education.service');

class EducationController {
    async getEducations(req, res) {
        try {
            const educations = await educationService.getAllEducations();
            res.status(200).json(educations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createEducation(req, res) {
        try {
            const education = await educationService.addEducation(req.body);
            res.status(201).json(education);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EducationController();
