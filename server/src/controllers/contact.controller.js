const contactRepository = require('../repositories/contact.repo');
const asyncHandler = require('../utils/asyncHandler');

exports.submitContact = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all required fields'
        });
    }

    const contact = await contactRepository.create({
        name,
        email,
        subject,
        message
    });

    res.status(201).json({
        success: true,
        data: contact,
        message: 'Message sent successfully!'
    });
});

exports.getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await contactRepository.findAll();
    res.status(200).json({
        success: true,
        data: contacts
    });
});
