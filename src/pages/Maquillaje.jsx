import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';


const maquillajes = [
    {
        id: 'pintacaritas',
        titulo: 'Pintacaritas',
        descripcion: 'Descubre nuestro servicio de pintacaritas.',
        imagen: '../src/assets/img/maquillajes/pintacaritas.jpg'
    },
    {
        id: 'pinta-pancitas',
        titulo: 'Pinta Pancitas',
        descripcion: 'Conoce nuestro servicio de pinta pancitas.',
        imagen: '../src/assets/img/maquillajes/pancita1.jpg'
    },
    {
        id: 'glitter-bar',
        titulo: 'Glitter Bar',
        descripcion: 'Disfruta de nuestro servicio de glitter bar.',
        imagen: '../src/assets/img/maquillajes/gliter3.jpg'
    },
    {
        id: 'neon-party',
        titulo: 'Neon Party',
        descripcion: 'Explora nuestro servicio de Neon Party.',
        imagen: '../src/assets/img/maquillajes/neon1.jpg'
    }
];

const Maquillaje = () => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/maquillaje/${id}`);
    };

    const handleBackClick = () => {
        navigate('/servicios');
    };

    return (
<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
    <Box sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <Grid item>
                <Button onClick={handleBackClick} variant="contained">
                    Volver
                </Button>
            </Grid>
            <Grid item xs>
                <Typography variant="h4" align="center" gutterBottom>
                    Servicios de Maquillaje
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={4}>
            {maquillajes.map((maquillaje, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                        onClick={() => handleCardClick(maquillaje.id)}
                        sx={{
                            cursor: 'pointer',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                            transition: 'transform 0.3s', 
                            '&:hover': {
                                transform: 'scale(1.05)', 
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt={maquillaje.titulo}
                            height="300"
                            image={maquillaje.imagen}
                            sx={{ borderBottom: '1px solid #e0e0e0' }} 
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" component="div" gutterBottom>
                                {maquillaje.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {maquillaje.descripcion}
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

export default Maquillaje;
