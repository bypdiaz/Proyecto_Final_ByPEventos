import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BE_HOST,
});

export const registrar = (usuario) => api.post('/usuarios', usuario);
export const iniciarSesion = (credenciales) => api.post('/login', credenciales);
export const obtener = (id) => api.get(`/usuarios/${id}`);
export const actualizar = (id, datos) => api.put(`/usuarios/${id}`, datos);
export const eliminar = (id) => api.delete(`/usuarios/${id}`);
export const obtenerUsuarios = () => api.get('/admin/usuarios');

export const eliminarServicio = (usuarioId, servicioId) => api.delete(`/admin/usuarios/${usuarioId}/servicios/${servicioId}`);
export const agregarServicioAdquirido = (servicioAdquirido) => api.post('/servicios', servicioAdquirido);
export const obtenerServicioAdquiridos = (usuarioId) => api.get(`/usuarios/${usuarioId}/servicios`);
export const obtenerTodosServicioAdquiridos = () => api.get(`/servicios-adquiridos`);


export default api;
