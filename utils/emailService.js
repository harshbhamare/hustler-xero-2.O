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

// Function to send the first email (after successful registration)
exports.sendRegistrationEmail = (recipientEmail, studentName) => {
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
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #00b187;">Hello ${studentName},</h2>
                <p>Thank you for registering for our Xeroship program! We are excited to have you on board.</p>
                <p>Your journey to professional excellence is just one step away. To confirm your seat, please pay the amount mentioned on your portal. Our dedicated team will reach out to you within the next 12 hours to guide you through the process.</p>
                <p>If you have any questions, feel free to reply to this email.</p>
                <p>Best regards,<br>The Hustler.XERO Team</p>
                <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 20px;">
                <p style="font-size: 0.8em; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
        `,
        bcc: bccRecipients
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending registration email:", error);
        } else {
            console.log("Registration email sent:", info.response);
        }
    });
};

// Function to send the second email (after payment confirmation)
exports.sendPaymentConfirmationEmail = (email, firstName, enrolledCourses, amountPaid, trnNumber) => {
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
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #00b187;">Congratulations, ${firstName}!</h2>
                <p>Your payment has been successfully processed, and your seat for the <strong>${enrolledCourses}</strong> program is officially confirmed!</p>
                <p><strong>Payment Details:</strong></p>
                <ul>
                    <li><strong>Amount Paid:</strong> ₹${amountPaid}/-</li>
                    <li><strong>Transaction ID:</strong> ${trnNumber}</li>
                    <li><strong>Course Enrolled:</strong> ${enrolledCourses}</li>
                </ul>
                <p>Welcome to the Xeroship community! We can't wait for you to start your learning journey with us. Your mentors will be in touch with you shortly with further instructions.</p>
                <p>Feel free to contact us if you need any assistance.</p>
                <p>Best regards,<br>The Hustler.XERO Team</p>
                <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 20px;">
                <p style="font-size: 0.8em; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
        `,
        bcc: bccRecipients
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending payment confirmation email:", error);
        } else {
            console.log("Payment confirmation email sent:", info.response);
        }
    });
};