import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { initializeDatabase } from './initializeDatabase.js';
import { getConnection } from './dbConfig.js';

const SALT_ROUNDS = 10;
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/status', async (req, res) => {
  res.status(200).send("UP");
});


//--------USUARIOS---------

// Endpoint para registrar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { email, nombreUsuario, contrasena, nombre, apellido, telefono } = req.body;

  console.log('Datos recibidos: ', req.body);

  if (!email || !nombreUsuario || !contrasena || !nombre || !apellido || !telefono) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const hashedPassword = await bcrypt.hash(contrasena, SALT_ROUNDS);
  let connection;
  try {
    connection = await getConnection();
    const sql = 'INSERT INTO usuarios (email, nombreUsuario, contrasena, nombre, apellido, telefono) VALUES (?, ?, ?, ?, ?, ?)';
    await connection.execute(sql, [email, nombreUsuario, hashedPassword, nombre, apellido, telefono]);
    res.status(201).send('Usuario registrado');
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error('Error cerrando la conexión:', err);
      }
    }
  }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { nombreUsuario, contrasena } = req.body;
  if (!nombreUsuario || !contrasena) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  let connection;
  try {
    const sql = 'SELECT * FROM usuarios WHERE nombreUsuario = ?';
    connection = await getConnection();
    const [results] = await connection.execute(sql, [nombreUsuario]);
    if (results.length === 0) {
      return res.status(401).send('Credenciales incorrectas');
    }
    const usuario = results[0];
    const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isPasswordValid) {
      return res.status(401).send('El Usuario o La Contraseña son incorrectos');
    }
    res.send({
      idUsuario: usuario.id,
      email: usuario.email,
      nombreUsuario: usuario.nombreUsuario,
      role: usuario.role
    });
  } catch (err) {
    console.error('Error buscando usuario:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error('Error cerrando la conexión:', err);
      }
    }
  }
});

// Endpoint para obtener los datos de un usuario
app.get('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;

console.log('Id recibido: ',id);

  let connection;
  try {
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    connection = await getConnection();
    const [results] = await connection.execute(sql, [id]);
    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    const usuario = results[0];
    res.send({
      idUsuario: usuario.id, 
      email: usuario.email,
      nombreUsuario: usuario.nombreUsuario,
      role: usuario.role,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono
    });
  } catch (err) {
    console.error('Error buscando usuario:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});

// Endpoint para editar los datos de un usuario
app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { email, nombreUsuario, contrasena, role } = req.body;
  if (!email || !nombreUsuario) {
    return res.status(400).send('Email y Nombre de Usuario son obligatorios');
  }
  let connection;
  try {
    let sql = 'UPDATE usuarios SET email = ?, nombreUsuario = ?, role = ? WHERE id = ?';
    const values = [email, nombreUsuario, role, id];
    if (contrasena) {
      const hashedPassword = await bcrypt.hash(contrasena, SALT_ROUNDS);
      sql = 'UPDATE usuarios SET email = ?, nombreUsuario = ?, contrasena = ?, role = ? WHERE id = ?';
      values.splice(2, 0, hashedPassword);
    }
    connection = await getConnection();
    await connection.execute(sql, values);
    res.send('Usuario actualizado');
  } catch (err) {
    console.error('Error actualizando usuario:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});


// Endpoint para eliminar un usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    connection = await getConnection();
    await connection.execute(sql, [id]);
    res.send('Usuario eliminado');
  } catch (err) {
    console.error('Error eliminando usuario:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});


//--------SERVICIOS---------

// Endpoint para añadir un servicio a un usuario
app.post('/api/servicios', async (req, res) => {
  const { servicioId, idUsuario, fecha, lugar, direccion, horario, condicionesEspeciales } = req.body;
  if (!servicioId || !idUsuario || !fecha || !lugar || !horario) {
    return res.status(400).send('Faltan datos obligatorios.');
  }
  let connection;
  try {
    const dateFormmated = fecha.split('T')[0];
    const sql = `
    INSERT INTO servicios_adquiridos (usuarioId, servicioId, fecha, lugar, direccion, horario, condicionesEspeciales)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [idUsuario, servicioId, dateFormmated, lugar, direccion || null, horario, condicionesEspeciales || null];
    connection = await getConnection();
    await connection.execute(sql, values);
    res.status(201).send('Servicio adquirido guardado con éxito.');
  } catch (err) {
    console.error('Error insertando servicio adquirido:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error('Error cerrando la conexión:', err);
      }
    }
  }
});


// Endpoint para obtener los servicios adquiridos por un usuario
app.get('/api/usuarios/:usuarioId/servicios', async (req, res) => {
  const { usuarioId } = req.params;
  let connection;
  try {
    const sql = `
    SELECT s.nombre, c.fecha, c.lugar, c.direccion, c.horario, c.condicionesEspeciales
    FROM servicios_adquiridos c
    JOIN servicios s ON c.servicioId = s.id
    WHERE c.usuarioId = ?
    `;
    connection = await getConnection();
    const [results] = await connection.execute(sql, [usuarioId]);
    res.send(results);
  } catch (err) {
    console.error('Error buscando servicios del usuario:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});


//Endpoint para obtener los servicios del usuario

app.get('/api/admin/servicios-adquiridos', async (req, res) => {
  let connection;
  try {
    const sql = `
      SELECT sa.id, u.nombreUsuario, s.nombre as nombreServicio, sa.fecha, sa.lugar, sa.direccion, sa.horario
      FROM servicios_adquiridos sa
      JOIN usuarios u ON sa.usuarioId = u.id
      JOIN servicios s ON sa.servicioId = s.id
    `;
    connection = await getConnection();
    const [results] = await connection.execute(sql);
    res.send(results);
  } catch (err) {
    console.error('Error buscando servicios adquiridos:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});


// Endpoint para obtener todos los usuarios (solo para administrador)
app.get('/api/admin/usuarios', async (req, res) => {
  let connection;
  try {
    const sql = 'SELECT id, email, nombreUsuario, nombre, apellido, telefono FROM usuarios WHERE role = "user"';
    connection = await getConnection();
    const [results] = await connection.execute(sql);
    res.send(results);
  } catch (err) {
    console.error('Error buscando usuarios:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});

// Endpoint para eliminar un servicio de un usuario (solo para administrador)
app.delete('/api/admin/usuarios/:usuarioId/servicios/:servicioId', async (req, res) => {
  const { usuarioId, servicioId } = req.params;
  let connection;
  try {
    const sql = 'DELETE FROM servicios_adquiridos WHERE servicioId = ? AND usuarioId = ?';
    connection = await getConnection();
    await connection.execute(sql, [servicioId, usuarioId]);
    res.send('Servicio eliminado');
  } catch (err) {
    console.error('Error eliminando servicio:', err);
    res.status(500).send('Ocurrio un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});

//Endpoint para obtener todos los servicios adquiridos

app.get('/api/servicios-adquiridos', async (req, res) => {
  let connection;
  try {
    const sql = 'SELECT * FROM servicios_adquiridos';
    connection = await getConnection();
    const [results] = await connection.execute(sql);
    if (results.length === 0) {
      return res.status(404).send('No se encontraron servicios adquiridos');
    }
    res.send(results);
  } catch (err) {
    console.error('Error buscando servicios adquiridos:', err);
    res.status(500).send('Ocurrió un error en el servidor');
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error('Error cerrando la conexión:', endErr);
      }
    }
  }
});


// Iniciar el servidor
const startServer = async () => {
  try {
    console.log('### INICIANDO API BE ###');
    await initializeDatabase();
    const port = process.env.BE_PORT ?? 0;
    const server = app.listen(port, () => {
      const actualPort = server.address().port;
      console.log(`Servidor en ejecución en el puerto http://localhost:${actualPort}/api/status`);
    });
  } catch (error) {
    console.error('Error inicializando el servidor:', error);
    process.exit(1);
  }
};

startServer();
