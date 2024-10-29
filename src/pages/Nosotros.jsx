import { Typography, Grid, Card, CardMedia, Box } from '@mui/material';

const Nosotros = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '87vh', pt: 7 }}>
    <Box sx={{ flex: '1 0 auto', px: 2 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4 }}>
        Sobre nosotros
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="320"
              image="../src/assets/img/nosotros.jpg"
              alt="Sobre Nosotros"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} mb={4}>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', mb:3 }}>
            ByP Eventos es un emprendimiento fundado por Camila Giménez que se especializa en ofrecer servicios de entretenimiento y animación para fiestas y eventos de todo tipo. Los servicios incluyen maquillaje artístico, pinta caritas, glitter bar, animaciones para jardines, fiestas infantiles y de adultos, y una sección de juegos de preguntas llamada Asking Game. La empresa se destaca por su creatividad y profesionalismo, brindando experiencias únicas y memorables para sus clientes. Nuestra misión es crear momentos mágicos y llenos de alegría a través de servicios de animación y entretenimiento personalizados, que superen las expectativas de nuestros clientes y hagan de cada evento una celebración inolvidable.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
  );
};

export default Nosotros;
