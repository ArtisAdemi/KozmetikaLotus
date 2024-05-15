const nodemailer = require('nodemailer');
require('dotenv').config();
const db = require("../models")

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

const sendEmail = ({email, subject, message}) => {
    const mailOptions = {
        from: process.env.EMAIL, 
        to: email, // Send email to the address saved in process.env.EMAIL
        subject: subject,
        html: `
        <p>Hello</p>
        <p>Message:</p>
        <p>${message}</p>
        <a href="http://localhost:3000">Check it out</a>
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

async function notifyUsersOfStockChange(productId) {
    const notifications = await db.StockNotifications.findAll({
        where: {
            productId: productId,
            notify: true
        },
    });

    notifications.forEach(async (notification) => {
        const user = await db.Users.findByPk(notification.userId)
        sendEmail({
            email: user.email,
            subject: "Product Back in Stock",
            message: `The product you were interested in is now back in stock!`
        });

        // Update notification to false after sending email
        await notification.update({ notify: false });
    });
};

module.exports = { sendContactEmail, notifyUsersOfStockChange };
