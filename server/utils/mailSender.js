const nodemailer = require("nodemailer");


const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        console.log("email is this ", email);
        console.log("the value of host is this  ", process.env.MAIL_HOST);
        console.log("the value of host is this  ", process.env.MAIL_USER);
        console.log("the value of host is this  ", process.env.MAIL_PASS);

        console.log("Before sending mail");

        let info = await transporter.sendMail({
            from: 'StudyNotion || Aman Verma',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        
        console.log("After sending mail");

        return info;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;
