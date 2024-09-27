import EmailModel from "../models/email";
import nodemailer from "nodemailer"
import { emailTypeData } from "../types/emailTypes";

interface EmailData  { 
    data: emailTypeData
}

const sendEmailToClient = async ({data}: EmailData) => { 

    const newEmailToBeSaved = new EmailModel({
            emailTitle: data.emailTitle,
            emailMessage: data.emailMessage,
            emailDate: data.emailDate,
            userId: data.userId,
            clientId: data.clientId,
            destinationEmail: data.destinationEmail
        });
    
    const savedEmail = await newEmailToBeSaved.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'obitsoftware@gmail.com', 
        pass: 'jghl xhdk bqju xtpj' 
      },
      tls: {
        rejectUnauthorized: false
      }
     });
       
     const mailOptions = {
      from: 'salasoctavio129@gmail.com', 
      to:  data.destinationEmail.toString(), 
      subject: data.emailTitle, 
      text:  data.emailMessage 
    };

    await transporter.sendMail(mailOptions);
    return savedEmail
};

export default sendEmailToClient