const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using your email service's SMTP details
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Sends a registration confirmation email.
 * @param {string} recipientEmail - The email address of the recipient.
 * @param {string} studentName - The name of the student.
 * @returns {Promise<object>} A promise that resolves with the email sending result.
 */
exports.sendRegistrationEmail = async (recipientEmail, studentName) => {
    const bccRecipients = [
        process.env.EMAIL_ONE,
        process.env.EMAIL_TWO,
        process.env.EMAIL_THREE
    ];

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: '🚀 Your Registration is One Step Away!',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; padding: 20px; text-align: center;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <div style="background-color: #00b187; padding: 30px 20px; color: white; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">Welcome to Hustler.XERO!</h1>
                    </div>
                    <div style="padding: 40px; text-align: left; color: #333333;">
                        <h2 style="color: #00b187; margin-top: 0;">Hello ${studentName},</h2>
                        <p style="font-size: 16px; line-height: 1.6;">Thank you for registering for our **Xeroship** program! We are excited to have you on board.</p>
                        <p style="font-size: 16px; line-height: 1.6;">Your journey to professional excellence is just one step away. To confirm your seat, please pay the amount mentioned on your portal. Our dedicated team will reach out to you within the next 12 hours to guide you through the process.</p>
                        <p style="font-size: 16px; line-height: 1.6;">If you have any questions, feel free to reply to this email.</p>
                        <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong>The Hustler.XERO Team</strong></p>
                    </div>
                    <div style="background-color: #f4f7f6; padding: 20px; font-size: 12px; color: #888888; text-align: center;">
                        <p style="margin: 0;">This is an automated message. Please do not reply directly to this email.</p>
                    </div>
                </div>
            </div>
        `,
        bcc: bccRecipients
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Registration email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending registration email:", error);
        throw error;
    }
};

/**
 * Sends a payment confirmation email.
 * @param {object} details - Object containing payment details.
 * @param {string} details.email - Recipient's email address.
 * @param {string} details.firstName - Recipient's first name.
 * @param {string} details.enrolledCourses - Name of the enrolled course.
 * @param {number} details.amountPaid - Amount paid.
 * @param {string} details.trnNumber - Transaction number.
 * @returns {Promise<object>} A promise that resolves with the email sending result.
 */
exports.sendPaymentConfirmationEmail = async ({ email, firstName, enrolledCourses, amountPaid, trnNumber }) => {
    const bccRecipients = [
        process.env.EMAIL_ONE,
        process.env.EMAIL_TWO,
        process.env.EMAIL_THREE
    ];

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🎉 Congratulations! Your Seat is Confirmed!',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; padding: 20px; text-align: center;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <div style="background-color: #00b187; padding: 30px 20px; color: white; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">Seat Confirmed!</h1>
                    </div>
                    <div style="padding: 40px; text-align: left; color: #333333;">
                        <h2 style="color: #00b187; margin-top: 0;">Congratulations, ${firstName}!</h2>
                        <p style="font-size: 16px; line-height: 1.6;">Your payment has been successfully processed, and your seat for the <strong>${enrolledCourses}</strong> program is officially confirmed!</p>
                        
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #00b187; margin-top: 0;">Payment Details</h3>
                            <ul style="list-style-type: none; padding: 0;">
                                <li style="margin-bottom: 10px;"><strong>Amount Paid:</strong> ₹${amountPaid}/-</li>
                                <li style="margin-bottom: 10px;"><strong>Transaction ID:</strong> ${trnNumber}</li>
                                <li><strong>Course Enrolled:</strong> ${enrolledCourses}</li>
                            </ul>
                        </div>
                        
                        <p style="font-size: 16px; line-height: 1.6;">Welcome to the Xeroship community! We can't wait for you to start your learning journey with us. Your mentors will be in touch with you shortly with further instructions.</p>
                        <p style="font-size: 16px; line-height: 1.6;">Feel free to contact us if you need any assistance.</p>
                        <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong>The Hustler.XERO Team</strong></p>
                    </div>
                    <div style="background-color: #f4f7f6; padding: 20px; font-size: 12px; color: #888888; text-align: center;">
                        <p style="margin: 0;">This is an automated message. Please do not reply directly to this email.</p>
                    </div>
                </div>
            </div>
        `,
        bcc: bccRecipients
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Payment confirmation email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending payment confirmation email:", error);
        throw error;
    }
};