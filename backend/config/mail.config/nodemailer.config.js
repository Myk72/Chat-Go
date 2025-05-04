import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export const transporter =  nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 465,
    secure : true,
    auth : {
        user : process.env.USER,
        pass : process.env.APP_PASS
    }
})

