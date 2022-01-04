const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: 'k.gogol13@gmail.com',
        pass: '11111111q',
    },
});

exports.sendEmailCF = functions.https.onRequest((req, res) => {
    const mailOptions = {
        from: `k.gogol13@gmail.com`,
        to: `${req.body.email}`
    };
    // in case you get CORS errors you need these 2 lines of code
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Credentials', 'true');

    cors(req, res, () => {
        mailOptions.subject = 'Contact Form Message';
        mailOptions.html =`
                            <p>Email: ${req.body.email}</p>
                            <p>Name: ${req.body.password}</p>
                            <p>Message: ${req.body.message}</p>
                        `;
        return mailTransport.sendMail(mailOptions)
            .then(() => {
                return res.status(200).json({success: true})
            })
            .catch((e) => {
                return res.status(400).json({err: e});
            })
    });
});