require('dotenv').config({ path: '.env.local' });
import nodemailer from 'nodemailer'

const enableCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    // specific logic for the preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    return await fn(req, res)
}

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

export default enableCors(handler);