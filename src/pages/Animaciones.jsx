import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

// TODO: Podria incluirse en el DER del proyecto
const animaciones = [
    {
        id: 'cumples-infantiles',
        titulo: 'Cumples Infantiles',
        descripcion: 'Celebra con nosotros tus cumples infantiles.',
        imagen: '../src/assets/img/animaciones/cumples.jpg'
    },
    {
        id: 'jardincitos',
        titulo: 'Jardincitos',
        descripcion: 'Descubre nuestras fiestas para jardincitos.',
        imagen: '../src/assets/img/animaciones/jardin.jpg'
    },
    {
        id: 'desafio-aqua',
        titulo: 'Desafío Aqua',
        descripcion: 'Disfruta del desafío Aqua en tus eventos.',
        imagen: '../src/assets/img/animaciones/aqua.jpg'
    },
    {
        id: 'asking-game',
        titulo: 'Asking Game',
        descripcion: 'Diviértete con nuestro juego de preguntas, Asking Game.',
        imagen: '../src/assets/img/animaciones/asking.jpg'
    },
    {
        id: 'baby-shower',
        titulo: 'Baby Shower',
        descripcion: 'Celebra tu baby shower con nosotros.',
        imagen: '../src/assets/img/animaciones/babyshower.jpg'
    }
];

const Animaciones = () => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/animaciones/${id}`);
    };

    const handleBackClick = () => {
        navigate('/servicios');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '70vh', pt: 10 }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                    <Grid item>
                        <Button onClick={handleBackClick} variant="contained">
                            Volver
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4" align="center" gutterBottom>
                            Servicios de Animaciones
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    {animaciones.map((animacion, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card onClick={() => handleCardClick(animacion.id)} sx={{ 
                                 cursor: 'pointer',
                                 boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                                 transition: 'transform 0.3s', 
                                 '&:hover': {
                                 transform: 'scale(1.05)',  
                                 },

                                }}>
                                <CardMedia
                                    component="img"
                                    alt={animacion.titulo}
                                    height="300" // Ajusta la altura de la imagen según sea necesario
                                    image={animacion.imagen}
                                    sx={{ borderBottom: '1px solid #e0e0e0' }}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {animacion.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {animacion.descripcion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Animaciones;
