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

// const sendEmail = async ({email, subject, message}) => {
//     const mailOptions = {
//         from: process.env.EMAIL, 
//         to: email, // Send email to the address saved in process.env.EMAIL
//         subject: subject,
//         html: `
//         <p>Hello</p>
//         <p>Message:</p>
//         <p>${message}</p>
//         <a href="http://localhost:3000">Check it out</a>
//     `
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Email sent: " + info.response);
//         }
//     });
// }

const sendEmail = async (to, subject, message) => {
    console.log('Preparing to send email...');
    let transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // your email
            pass: process.env.PASS,    // your email password
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
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

const sendOrderStatusEmail = async (userId) => {
    const statusUpdate = await db.Orders.findAll({
        where: {
            userId: userId
        }
    });

    statusUpdate.forEach(async (status) => {
        const user = await db.Users.findByPk(status.userId)
        sendEmail({
            email: user.email,
            subject: "Order Update",
            message: `The order you made has updated in status!`
        });
    })

    // const user = await db.Users.findByPk(userId);
    // const order = await db.Orders.findByPk(orderId);

    // if (!user || !order) {
    //     console.log("User or Order not found");
    //     return;
    // }

    // const mailOptions = {
    //     from: process.env.EMAIL,
    //     to: user.email,
    //     subject: "Order Status Update",
    //     html: `
    //         <p>Hello ${user.email},</p>
    //         <p>Your order status has been updated to: ${selectedStatus}</p>
    //         <p>Thank you for shopping with us!</p>
    //     `
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("Email sent: " + info.response);
    //     }
    // });
    
};

module.exports = { sendContactEmail, notifyUsersOfStockChange, sendOrderStatusEmail, sendEmail };
