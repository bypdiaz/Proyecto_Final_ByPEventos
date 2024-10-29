import { useState } from 'react';
import { useAuth } from '../components/AutentificacionProvider';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { iniciarSesion } from '../components/UsuariosClient';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    iniciarSesion({ nombreUsuario, contrasena })
      .then((response) => {
        login(response.data)
        navigate('/');
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        setError('Credenciales incorrectas');
      });
  };

  return (
    <Container component="main" maxWidth="md">
    <Box
      sx={{
        mt: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 600, mx: 'auto' }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Iniciar Sesión
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="nombreUsuario"
          label="Nombre de Usuario"
          name="nombreUsuario"
          autoComplete="nombreUsuario"
          autoFocus
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
          id="contrasena"
          autoComplete="current-password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 16 }}
          >
            Iniciar Sesión
          </Button>
      </Box>
    </Box>
  </Container>
  
  );
};

export default Login;
