import { Typography, Grid, Card, CardMedia, Box } from '@mui/material';

const Home = () => {
  return (
    <>
         <Box sx={{ mt: 10, mb:5 , display: 'flex', justifyContent: 'center' }}>
          <img
            src="../src/assets/img/home/portada.jpg"
            alt="Imagen Principal"
            style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '900px', height: 'auto' }}
          />
      </Box>
      <Typography variant="h5" align="center" sx={{ mt: 4, mb:5 }}>
        Los mejores recuerdos en tu día especial...
      </Typography>
      <Box sx={{ mt: 2, ml:4, mr:4, mb:5}}>
        <Grid container spacing={4} justifyContent="center">
          {['servicio1.jpg', 'servicio2.jpg', 'servicio3.jpg', 'servicio4.jpg'].map((image, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={`../src/assets/img/home/${image}`}
                  alt={`Servicio ${index + 1}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>      
      
    </>
  )
}

export default Home
