
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.EMAIL_APIKEY);

export const send = async (to, subject, text) => {
  const msg = {
    to,
    cc: process.env.EMAIL_SENDER,
    from: process.env.EMAIL_SENDER, // Usar el email verificado en SendGrid
    subject,
    text,
  };
  try {
    await sgMail.send(msg);
    console.log('Correo enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    if (error.response) {
      console.error('Error detalles:', error.response.body);
    }
    throw error;
  }
};
