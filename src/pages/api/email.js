require('dotenv').config({ path: '.env.local' });
import nodemailer from 'nodemailer'

const handler = (req, res) => {
    const data = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.emailUsername,
            pass: process.env.emailPass
        }
    });

    const mailOptions = {
        from: process.env.emailUsername,
        to: process.env.emailUsername,
        subject: 'Email from Portfolio',
        text: `Email from ${data.email} named ${data.name}.\nMessage sent: ${data.message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(200).json({
                status: "invalid"
            })
        } else {
            return res.status(200).json({
                status: "success"
            })
        }
    });
}

export default handler;