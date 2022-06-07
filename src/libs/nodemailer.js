"use strict";
const nodemailer = require('nodemailer');

const nodemailerMail = async (token, email) => {
    try {

        let message = `
            <h6>Confirma tu cuenta</h6>
            <a href="http://localhost:3000/${token}" target="_black">Confimar</a>
        `
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })


        await transporter.sendMail({
            from: '"Bienvenido a NIKSTORE" <NIKSTORE@gmail.com>',
            to: email,
            subject: "Empieza ahora mismo a ver nuevas publicaciones",
            html: message
        });

    } catch (err) {
        console.log(err)
    }
}

module.exports = nodemailerMail;