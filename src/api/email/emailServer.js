
import express, { json } from 'express';
import { send } from './emailSender.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Ignorar certificados autofirmados
// Se debe usar solo en ambientes de desarrollo, no productivos
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

dotenv.config();
app.use(cors());
app.use(json());

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await send(to, subject, text);
    res.status(200).send('Correo enviado correctamente');
  } catch (error) {
    res.status(500).send('Error al enviar el correo');
  }
});

const startServer = async () => {
  try {
    console.log('### INICIANDO API EMAIL ###');
    const port = process.env.EMAIL_PORT ?? 0;
    const server = app.listen(port, () => {
      const actualPort = server.address().port;
      console.log(`Servidor de correo electrónico escuchando en el puerto http://localhost:${actualPort}`);
    });
  } catch (error) {
    console.error('Error inicializando el servidor:', error);
    process.exit(1);
  }
};

startServer();
