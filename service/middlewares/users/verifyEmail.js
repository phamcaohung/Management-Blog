import nodemailer from 'nodemailer'
import { verifyEmailHTML } from '../../utils/emailTemplate.js';
import emailsDAO from '../../dao/email.dao.js';
import usersDAO from '../../dao/user.dao.js';
import Email from '../../model/email.model.js';

const SERVICE_URL = process.env.SERVICE_URL

export const sendVerificationEmail = async (req, res) => {
    const USER = process.env.EMAIL
    const PASS = process.env.PASSWORD
    const { email, name } = req.body

    const verificationCode = Math.floor(10000 + Math.random() * 90000)
    const verificationLink = `${SERVICE_URL}/auth/verify?code=${verificationCode}&email=${email}`

    try {
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: USER,
                pass: PASS,
            },
        })

        let info = await transporter.sendMail({
            from: `"Management Blog" <${USER}>`,
            to: email,
            subject: "Verify your email address",
            html: verifyEmailHTML(name, verificationLink, verificationCode),
        })
        const data = new Email({
            email: email,
            verificationCode: verificationCode,
            messageId: info.messageId,
            purpose: "signup"
        })

        await emailsDAO.createEmail(data)

        res.status(200).json({
            message: `Verification email was successfully sent to ${email}`
        })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const verifyEmail = async (req, res) => {
    const { code, email } = req.query

    try {
        const verification = await emailsDAO.findEmailByEmailAndCode(email, Number(code))
        
        if (!verification) {
            return res
                .status(400)
                .json({ message: "Verification code is invalid or has expired" })
        }

        await usersDAO.updateIsEmailVerified(email)
        await emailsDAO.deleteEmailsByEmail(email)

        res.status(200).json({ message: "Email verification process was successful" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}