import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.CLIENT_URL
export const VerificationCodeEmail = ({verificationToken }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification Code</title>
        <style>
            body {
                font-family: Arial, sans-serif; /* Fallback font */
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center; /* Center align text */
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center; /* Center align text within the container */
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
                margin: 20px 0; /* Add some margin for spacing */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Email Verification Code</h1>
            <p>Hi there,</p>
            <p>Your verification code is:</p>
            <p class="code">${verificationToken}</p>
            <p>Please enter this code in the application to verify your email address.</p>
            <p>If you did not request this code, please ignore this email.</p>
            <p>Best regards</p>
        </div>
    </body>
    </html>
    `;
};


export const ResetPasswordEmail = (resetToken) => {
  const resetUrl = `${API_URL}/reset-password/${resetToken}` ;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center; /* Center align text */
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center; /* Center align text within the container */
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            a:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Reset Your Password</h1>
            <p>Hi there,</p>
            <p>We received a request to reset your password. Click the link below to reset it:</p>
            <a href="${resetUrl}">Reset Password</a>
            <p>The link is valid for 1 hour. If you did not request a password reset, please ignore this email.</p>
            <p>Best regards</p>
        </div>
    </body>
    </html>
    `;
};
