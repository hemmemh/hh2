const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = require('../utils/config');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>код для активации</h1>
                        <div>${link}</div>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
