import { useState, useEffect } from "react";
import { useAuth } from "../components/AutentificacionProvider";
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { obtenerServicioAdquiridos } from "../components/UsuariosClient";
import dayjs from "dayjs";
import { obtener } from '../components/UsuariosClient';

const Perfil = () => {
  const { usuario } = useAuth(); 
  const [servicios, setServicios] = useState([]);
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    if (usuario) {
      // Obtener la información completa del usuario
      obtener(usuario.idUsuario)
        .then((response) => {
          setDatosUsuario(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });

      // Obtener los servicios adquiridos del usuario
      obtenerServicioAdquiridos(usuario.idUsuario)
        .then((response) => {
          setServicios(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los servicios del usuario:", error);
        });
    }
  }, [usuario]);

  if (!usuario || !datosUsuario) {
    return null;
  }


return (
  <Container component="main" maxWidth="md" sx={{ mt: 12, mb: 24.5 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5" sx={{ fontSize: '2rem', color: '#47d6c4' }}>
        PERFIL DE USUARIO
      </Typography>
      <Box sx={{ mt: 2, width: '100%' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0f7f4' }}>
                <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Información del Usuario</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Usuario</TableCell>
                <TableCell>{datosUsuario.nombreUsuario}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Correo Electrónico</TableCell>
                <TableCell>{datosUsuario.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Nombre</TableCell>
                <TableCell>{datosUsuario.nombre}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Apellido</TableCell>
                <TableCell>{datosUsuario.apellido}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '30%' }}>Número de Teléfono</TableCell>
                <TableCell>{datosUsuario.telefono}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {usuario.role !== "admin" && (
        <Box sx={{ mt: 4, width: '100%' }}>
          <Typography component="h2" variant="h6" sx={{ fontSize: '1.25rem', color: '#47d6c4', mb: 2 }}>
            Servicios Adquiridos
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e0f7f4' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Servicio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Lugar</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Horario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servicios.map((servicio) => (
                  <TableRow key={servicio.id}>
                    <TableCell>{servicio.nombre}</TableCell>
                    <TableCell>{dayjs(servicio.fecha).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>{servicio.lugar}</TableCell>
                    <TableCell>{servicio.horario}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  </Container>
);
};

export default Perfil;
