// testEmail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, message) => {
    console.log('Preparing to send email...');
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'me env nuk mbajshin i kom shkru ktu direkt', // your email
            pass: 'me env nuk mbajshin i kom shkru ktu direkt',    // your email password
        },
    });

    let mailOptions = {
        from: 'me env nuk mbajshin i kom shkru ktu direkt',
        to: to,
        subject: subject,
        text: message,
    };

    try {
        console.log('Sending email to:', to);
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;  // rethrow error to be handled in the caller function
    }
};

// Test the function
sendEmail('youremail@blla.com', 'Test Subject', 'Test Message')
    .then(() => console.log('Test email sent'))
    .catch(error => console.error('Error in test email:', error));
