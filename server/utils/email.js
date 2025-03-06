import nodemailer from 'nodemailer'

export const sendMail = async (option)=>{
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        auth :{
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASSWORD,
        },
    })

    const emailOption ={
        from : process.env.DOMAIN_NAME+ ' support<support@'+process.env.DOMAIN_NAME.toLowerCase()+".com>",
        to : option.email,
        subject : option.subject,
        text : option.message,     
    }

    await transporter.sendMail(emailOption);
}