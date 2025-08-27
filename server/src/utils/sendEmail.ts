import nodemailer, { SendMailOptions } from 'nodemailer';
import getEnvVariable from './getEnvVariable';
import systemLogger, { LogLevels } from './logger';
import { ISendEmail } from '../interfaces/index.interface';
import SystemError from './systemError';


const transporter = nodemailer.createTransport({
    host: getEnvVariable("SMTP_HOST", true),
    port: Number(getEnvVariable("SMTP_PORT", true)),
    secure: true,
    auth: {
        user: getEnvVariable("SMTP_USERNAME", true),
        pass: getEnvVariable("SMTP_PASSWORD", true),
    },
} as SendMailOptions);


const sendEmail = async (data: ISendEmail): Promise<true> => {
    try {
        const mailOptions = {
            from: getEnvVariable("SMTP_FROM", true),
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new SystemError("Failed to send email.", {
            data,
            error,
        });
    }

    return true;
}

const verifySMTPConnection = async (): Promise<boolean> => {
    try {
        await transporter.verify();

        systemLogger(LogLevels.INFO, "SMTP: SMTP connection verified.");
    } catch (error) {
        systemLogger(LogLevels.FATAL, "SMTP: Couldn't connect to SMTP server.");
        systemLogger(LogLevels.FATAL, "*** EXITING PROCESS IMMEDIATELY ***");

        process.exit(-1);
    }

    return true;
}


export default sendEmail;
export {
    verifySMTPConnection
};
