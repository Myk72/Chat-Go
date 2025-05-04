import { VerificationCodeEmail, ResetPasswordEmail } from "./emailTemplet.js";
import { transporter } from "./nodemailer.config.js";
import dotenv from "dotenv";
dotenv.config();


export const sendVerificationEmail = async ({email, verificationToken}) => {
    try {
        await transporter.sendMail({
            from: `"noreply" <${process.env.USER}>`,
            to: email,
            subject: "Verify Your Email",
            text : "Please verify your email with the following code",
            html: VerificationCodeEmail({ email, verificationToken })
        });
 
        console.log("Email sent successfully");


    } catch {
        console.log("Error sending email", error)       

    }
};

export const sendResetPasswordEmail = async ({email, resetToken}) => {
    try {
        await transporter.sendMail({
            from: `"noreply" <${process.env.USER}>`,
            to: email,
            subject: "Reset Your Password",
            text : "Please reset your password with the following link",
            html: ResetPasswordEmail(email, resetToken)
        });
 
        console.log("Email sent successfully");


    } catch  {
        console.log(error)
    }   
}