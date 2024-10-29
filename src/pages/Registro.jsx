import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { ValidarContrasenia } from '../components/ValidarContrasenia';
import { registrar } from '../components/UsuariosClient';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!ValidarContrasenia(contrasena)) {
      setError('La Contraseña no cumple con los Requisitos de Seguridad. Debe Contener al menos 6 caracteres, Una Mayúscula, Una Minúscula, Un Número y un Caracter Especial');
      return;
    }
    registrar({ email, nombreUsuario, contrasena, nombre, apellido, telefono })
      .then((response => {
        // TODO: Usar notistack para informar al usuario
        console.log(response.data);
        navigate('/login');
      }))
      .catch((error) => {
        console.error('Error de registro:', error);
        setError('Error al registrar el usuario');
      });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 6.2, mt: 10 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
          mx: 'auto',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Registrarse
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre"
            name="nombre"
            type='text'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onInput={(e) => {
              const regex = /^[A-Za-z\s]*$/; // Solo letras y espacios
              if (!regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Elimina cualquier símbolo o número
              }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Apellido"
            name="apellido"
            type='text'
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            onInput={(e) => {
              const regex = /^[A-Za-z\s]*$/; // Solo letras y espacios
              if (!regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Elimina cualquier símbolo o número
              }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Correo Electrónico"
            name="email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Número de Teléfono"
            name="telefono"
            value={telefono}
            type='number'
            onChange={(e) => setTelefono(e.target.value)}
            onInput={(e) => {
              const regex = /^[0-9]*$/; 
              if (!regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(/[0-9]/g, ''); 
              }
            }}
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nombre de Usuario"
            name="nombreUsuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="contrasena"
            label="Contraseña"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmarContrasena"
            label="Confirmar Contraseña"
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>


  );
};

export default Registro;
