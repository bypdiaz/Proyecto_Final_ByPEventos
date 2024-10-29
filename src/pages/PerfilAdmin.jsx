import { useEffect, useState } from "react";
import { obtenerUsuarios, eliminar, eliminarServicio, obtenerTodosServicioAdquiridos } from "../components/UsuariosClient";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import dayjs from "dayjs";

const PerfilAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [serviciosAdquiridos, setServiciosAdquiridos] = useState([]);

  useEffect(() => {
    const fetchServicios_adquiridos = async () => {
      try {
        const response = await obtenerTodosServicioAdquiridos();
        setServiciosAdquiridos(response.data);
      } catch (error) {
        console.error("Error al obtener servicios adquiridos:", error);
      }
    };

    fetchServicios_adquiridos();
  }, []);


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await obtenerUsuarios();
        setUsuarios(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {
      await eliminar(id);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleEliminarServicio = async (usuarioId, servicioId) => {
    try {
      await eliminarServicio(usuarioId, servicioId);
      setServiciosAdquiridos(serviciosAdquiridos.filter(servicio => servicio.servicioId !== servicioId || servicio.usuarioId !== usuarioId));
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  };


  return (
    <Box sx={{mt: 12, mb: 4, display: "flex", flexDirection: "column", alignItems: "center",}}>
      <Typography component="h1" variant="h5" sx={{ fontSize: "2rem", color: "#47d6c4" }}>Perfil de Administrador</Typography>
      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: 3, width: "80%", maxWidth: "800px", }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0f7f4" }}>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Usuario</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Apellido</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telefono</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombreUsuario}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleEliminarUsuario(usuario.id)} sx={{ backgroundColor: "#ff5f5f", color: "#fff" }}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, width: '80%', mx: 'auto' }}>
        <Typography component="h2" variant="h6" sx={{ fontSize: '1.25rem', color: '#47d6c4', mb: 2, textAlign: 'center' }}>
          Servicios Adquiridos
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, maxWidth: '100%', mx: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0f7f4' }}>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Usuario</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Servicio</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Lugar</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Dirección</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Horario</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviciosAdquiridos.map((servicio) => (
                <TableRow key={servicio.id}>
                  <TableCell>{servicio.usuarioId}</TableCell>
                  <TableCell>{servicio.servicioId}</TableCell>
                  <TableCell>{dayjs(servicio.fecha).format('DD-MM-YYYY')}</TableCell>
                  <TableCell>{servicio.lugar}</TableCell>
                  <TableCell>{servicio.direccion}</TableCell>
                  <TableCell>{servicio.horario}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleEliminarServicio(servicio.usuarioId, servicio.servicioId)}
                      sx={{ backgroundColor: "#ff5f5f", color: "#fff" }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>


  );
};

export default PerfilAdmin;