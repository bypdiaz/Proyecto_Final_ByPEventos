
import bcrypt from 'bcryptjs';
import { getConnection } from './dbConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;
const insertAdminQuery = `
INSERT INTO usuarios (nombreUsuario, contrasena, email, role)
VALUES ('bypadmin', ?, 'byp.eventos.c@gmail.com', 'admin')
ON DUPLICATE KEY UPDATE
    contrasena=VALUES(contrasena),
    email=VALUES(email),
    role=VALUES(role)
`;

const insertAdmin = async (connection, hashedPassword) => {
    await connection.execute(insertAdminQuery, [hashedPassword]);
    console.log('El default admin se registro o ya se encontraba registrado');
};

export const initializeDatabase = async () => {
    let connection;
    try {
        connection = await getConnection();
        console.log('Chequeo de la conexion a la base de datos: OK');
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, SALT_ROUNDS);
        await insertAdmin(connection, hashedPassword);
    } catch (err) {
        console.error('Error inicializando la base de datos:', err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (endErr) {
                console.error('Error cerrando la conexión:', endErr);
            }
        }
    }
};
