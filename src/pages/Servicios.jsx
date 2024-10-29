import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

// TODO: Podria incluirse en el DER del proyecto
const servicios = [
    {
        id: 'maquillaje',
        titulo: 'Maquillaje',
        descripcion: 'Explora nuestros servicios de maquillaje.',
        imagen: '../src/assets/img/servicios/maquillaje.jpg'
    },
    {
        id: 'animaciones',
        titulo: 'Animaciones',
        descripcion: 'Descubre nuestras divertidas animaciones.',
        imagen: '../src/assets/img/servicios/animaciones.jpg'
    }
];

const Servicios = () => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/${id}`);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ flexGrow: 1, p: 3, mt: 8}}>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
                    Nuestros Servicios
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    {servicios.map((servicio, index) => (
                        <Card key={index} onClick={() => handleCardClick(servicio.id)} 
                        sx={{ 
                            cursor: 'pointer', 
                            width: 'calc(45% - 16px)',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                            boxSizing: 'border-box',
                            transition: 'transform 0.3s', 
                                 '&:hover': {
                                 transform: 'scale(1.05)',  
                                 }, 
                            }}>
                            <CardMedia
                                component="img"
                                alt={servicio.titulo}
                                height="300"
                                image={servicio.imagen}
                                sx={{ borderBottom: '1px solid #e0e0e0' }}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {servicio.titulo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {servicio.descripcion}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Servicios;
