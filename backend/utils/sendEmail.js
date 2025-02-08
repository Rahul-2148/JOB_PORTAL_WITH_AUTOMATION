import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Send email after user registration
export const sendEmail = async ({email, subject, message}) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER_MAIL,
        to: email,
        subject: subject,
        text: message
    };

    await transporter.sendMail(mailOptions);
};