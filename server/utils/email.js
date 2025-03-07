import nodemailer from 'nodemailer'

export const sendMail = async (option)=>{
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_HOST,
        auth :{
            user : process.env.GMAIL_EMAIL,
            pass : process.env.GMAIL_APP_PASSWORD,
        },
    })

    const htmlMessage = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .header {
                    background-color: #4f46e5;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px 5px 0 0;
                    text-align: center;
                }
                .footer {
                    font-size: 12px;
                    text-align: center;
                    margin-top: 20px;
                    color: #666;
                }
                
                .button {
                    display: inline-block;
                    background-color: #4f46e5;
                    color: white !important; /* Force white color with !important */
                    padding: 10px 20px;
                    margin: 20px 0;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold; /* Make the text bold for better visibility */
                }
                /* Override any client styling for the button text */
                .button span {
                    color: white !important;
                }
                a {
                    color: #4f46e5;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Learnify Password Reset</h1>
                </div>
                <div style="padding: 20px;">
                    <p>Dear User,</p>
                    <p>We have received your password reset request. Please click the button below to reset your password:</p>
                    <p style="text-align: center;">
                        <a href="${option.resetLink || '#'}" class="button" style="color: white !important; background-color: #4f46e5; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                            <span style="color: white !important;">Reset Password</span>
                        </a>
                    </p>
                    <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                    <p><a href="${option.resetLink || '#'}">${option.resetLink || '#'}</a></p>
                    <p>This reset password link will be valid only for 10 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>Best regards,<br>Learnify Support Team</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} Learnify. All rights reserved.
                </div>
            </div>
        </body>
        </html>
        `;

    const emailOption ={
        from : `Learnify Support <support@${process.env.CLIENT_URL}+'>`,
        to : option.email,
        subject : option.subject,
        text : option.message,  
        html: option.resetLink ? htmlMessage : option.message.replace(/\n/g, '<br>'),
    }

    await transporter.sendMail(emailOption);
}