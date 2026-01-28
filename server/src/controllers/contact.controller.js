const contactRepository = require('../repositories/contact.repo');
const asyncHandler = require('../middlewares/asyncHandler');

exports.submitContact = asyncHandler(async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all required fields'
        });
    }

    const contact = await contactRepository.create({
        name,
        email,
        phone,
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

exports.replyToContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { subject, message, replyMessage } = req.body;

    const contact = await contactRepository.findById(id);

    if (!contact) {
        return res.status(404).json({
            success: false,
            error: 'Contact not found'
        });
    }

    try {
        await require('../utils/emailService')({
            to: contact.email,
            subject: `Re: ${contact.subject} - Response from Suraj Portfolio`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Hello ${contact.name},</h2>
                    <p>Thank you for reaching out.</p>
                    <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <p style="margin: 0; font-style: italic;">"${replyMessage}"</p>
                    </div>
                    <p>Best regards,</p>
                    <p><strong>Suraj Kanwar</strong></p>
                </div>
            `
        });

        // Update status to replied
        await contactRepository.updateStatus(id, 'replied');

        res.status(200).json({
            success: true,
            message: 'Reply sent successfully'
        });
    } catch (error) {
        console.error("Email send failed", error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email reply'
        });
    }
});
