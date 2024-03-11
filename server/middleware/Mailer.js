const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuring email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

// Send Email function
const sendContactEmail = (userData) => {
    const { name, email, phone, message } = userData;

    const mailOptions = {
        from: process.env.EMAIL, 
        to: process.env.EMAIL, // Send email to the address saved in process.env.EMAIL
        subject: "New Contact Form Submission",
        html: `
        <p>Hello,</p>
        <p>A user has contacted us with the following details:</p>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
        </ul>
        <p>Message:</p>
        <p>${message}</p>
    `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = { sendContactEmail };
