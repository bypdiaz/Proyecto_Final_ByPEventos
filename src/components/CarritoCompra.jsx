import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { agregarServicioAdquirido } from './UsuariosClient';
import { useAuth } from './AutentificacionProvider';
import { useSnackbar } from 'notistack';

const lugares = [
    { value: 'salon', label: 'Salón de eventos' },
    { value: 'jardin', label: 'Jardín' },
    { value: 'casa', label: 'Casa del cliente' },
    { value: 'otro', label: 'Otra ubicación' }
];

const CarritoCompra = ({ servicio, handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { usuario } = useAuth();
    const [datos, setDatos] = useState({
        fecha: null,
        lugar: '',
        direccion: '',
        horario: '',
        condicionesEspeciales: ''
    });

    const [camposCompletos, setCamposCompletos] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    };

    const handleDateChange = (date) => {
        setDatos({ ...datos, fecha: date });
    };

    const handlePagar = () => {
        if (datos.fecha && datos.lugar && datos.horario && (datos.lugar !== 'otro' || datos.direccion)) {
            const servicioAdquirido = {
                servicioId: servicio.id,
                ...datos,
                idUsuario: usuario.idUsuario
            };

            agregarServicioAdquirido(servicioAdquirido)
                .then(response => {
                    console.log('Servicio guardado:', response.data);
                    enqueueSnackbar("¡Pago realizado correctamente! Gracias por confiar en nosotros.", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                    handleClose();
                })
                .catch(error => {
                    console.error('Error al guardar el servicio:', error);
                    enqueueSnackbar("Hubo un problema al procesar el pago. Intente nuevamente.", {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                });
        } else {
            alert('Por favor complete todos los campos obligatorios.');
        }
    };

    const verificarCamposCompletos = () => {
        setCamposCompletos(datos.fecha && datos.lugar && datos.horario && (datos.lugar !== 'otro' || datos.direccion));
    };

    useEffect(() => {
        verificarCamposCompletos();
    }, [datos]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 600,
                    width: '100%',
                    bgcolor: 'white',
                    color: 'black',
                    borderRadius: 8,
                    p: 3
                }}
            >
                <Box mb={3}>
                    <Typography variant="h4">
                        Contratar Servicio: {servicio.nombre}
                    </Typography>
                </Box>
                <Box mb={3}>
                    <Typography variant="h5">
                        Precio: ${servicio.precio}
                    </Typography>
                </Box>
                <Typography variant="h6">Ingrese los detalles del servicio:</Typography>
                <DatePicker
                    label="Fecha del Servicio"
                    value={datos.fecha}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                    minDate={dayjs()}
                />
                <TextField
                    fullWidth
                    select
                    name="lugar"
                    label="Lugar del Servicio"
                    value={datos.lugar}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                >
                    {lugares.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {datos.lugar === 'otro' && (
                    <TextField
                        fullWidth
                        name="direccion"
                        label="Dirección del Servicio"
                        value={datos.direccion}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                    />
                )}
                <TextField
                    fullWidth
                    name="horario"
                    label="Horario del Servicio"
                    type="time"
                    value={datos.horario}
                    onChange={handleInputChange}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    // Acepta formato HH:MM
                    inputProps={{
                        pattern: "[0-9]{2}:[0-9]{2}",
                        title: "Formato válido: HH:MM"
                    }}
                    required
                />
                <TextField
                    fullWidth
                    name="condicionesEspeciales"
                    label="Condiciones Especiales"
                    value={datos.condicionesEspeciales}
                    onChange={handleInputChange}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePagar}
                        sx={{ mt: 2 }}
                        disabled={!camposCompletos}
                    >
                        Pagar
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default CarritoCompra;
