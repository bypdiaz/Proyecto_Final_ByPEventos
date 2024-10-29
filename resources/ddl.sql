CREATE DATABASE registro_usuario;

USE registro_usuario;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
);

ALTER TABLE usuarios ADD UNIQUE (nombreUsuario);

CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE servicios_adquiridos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioId INT NOT NULL,
    servicioId INT NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    horario TIME NOT NULL,
    condicionesEspeciales TEXT,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
    FOREIGN KEY (servicioId) REFERENCES servicios(id)
);
