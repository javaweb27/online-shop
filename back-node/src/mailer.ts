import nodemailer from "nodemailer"
import { CORS_URL, MAILER_EMAIL, MAILER_PASSWORD } from "./config.js"

// create reusable transporter object using the default SMTP transport
const mailerTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: MAILER_EMAIL, // generated ethereal user
    pass: MAILER_PASSWORD, // generated ethereal password
  },
})

mailerTransporter.verify().then(() => {
  console.log("Ready for sending emails")
})

export function mailerSendConfimationLink({
  userEmail,
  userConfirmationToken,
}: {
  userEmail: string
  userConfirmationToken: string
}) {
  const CONFIMATION_LINK = `${CORS_URL}/online-shop/#/confirm-account/${userConfirmationToken}`

  mailerTransporter.sendMail({
    from: "Confirm your email <devjavicont@gmail.com>", // sender address
    to: userEmail, // list of receivers
    subject: "Confirm your email", // Subject line
    html: /* HTML */ `
      <div style="font-size: 1.16rem;">
        <b> Please click on the following link to confirm your email</b>
        <br />
        <a target="_blank" href="${CONFIMATION_LINK}">Confirm email</a>
        <br />
        <br />
        <b> Or paste this link in your browser to confirm your email </b>
        <p>${CONFIMATION_LINK}</p>
      </div>
    `, // html body
  })
}
