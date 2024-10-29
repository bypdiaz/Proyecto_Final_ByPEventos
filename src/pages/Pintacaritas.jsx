import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Modal, Grid } from '@mui/material';
import { useAuth } from '../components/AutentificacionProvider';
import CarritoCompra from '../components/CarritoCompra';

const PintacaritasDetalle = () => {
  const { servicio } = useParams();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [abrirCarrito, setAbrirCarrito] = useState(false);

  const handleCerrarCarrito = () => {
    setAbrirCarrito(false);
  };


  let servicioDetallado = {};
  if (servicio === 'pintacaritas') {
    servicioDetallado = {
      id: 1,
      nombre: 'Pintacaritas',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh'}}>

          🎨 <b>PINTACARITAS</b> 🎨
          <br />
          <hr />
          🎨Es el arte del Maquillaje Fantasia, lleno de color y creatividad.
          Los diseños son a elección de los niños. Incluye mobiliario maletín con espejo iluminado  🎨 <br />
          ❗Utilizamos productos profesionales, hipoalergénicos, a base de agua sin aceites ni conservantes ❗
          <hr />
        </Typography>
      ),
      imagen: '../src/assets/img/maquillajes/pintacaritas2.jpg',
      precio: 20000
    };
  }

  if (servicio === 'pinta-pancitas') {
    servicioDetallado = {
      id: 2,
      nombre: 'Pinta Pancitas',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>

          <b>🤰🏻PINTA PANCITAS</b> 🤰🏻.

          <br />
          <hr />
          🌸Maquillaje corporal en la zona abdominal de la mamá. <br />
          🌸Recomendable realizarse en el tercer trimestre de embarazo. <br />
          🌸Ideal para tus sesiones de fotos y baby shower. <br />
          🌸 Diseño a elecció <br />
          🌸Servicio a domicilio <br />
          ❗Utilizamos productos profesionales, hipoalergénicos, a base de agua sin aceites ni conservantes ❗.
          <hr />
        </Typography>
      ),
      imagen: '../src/assets/img/maquillajes/pancita2.jpg',
      precio: 30000
    };
  }

  if (servicio === 'glitter-bar') {
    servicioDetallado = {
      id: 3,
      nombre: 'Glitter Bar',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>
          💎 <b>GLITTER BAR</b> 💎:
          <br />
          <hr />
          ✨Variedad de Glitters en polvo y gel <br />
          ✨Gemas y strass<br />
          ✨Apliques y sticker tattoo<br />
          ✨Glitter tattoo<br />
          ✨2 Face Gem para el/la anfitrión/a<br />
          ✨Incluye mobiliario con maletín y espejo iluminado<br />

          Todo a libre elección. Un diseño por persona (personalizados y realizados a mano alzada). <br />
          ❗Utilizamos productos profesionales, hipoalergénicos, a base de agua sin aceites ni conservantes ❗.
          <hr />

        </Typography>
      ),
      imagen: '../src/assets/img/maquillajes/gliter3.jpg',
      precio: 40000
    };
  }

  if (servicio === 'neon-party') {
    servicioDetallado = {
      id: 4,
      nombre: 'Neon Party',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>
          <b>🏳‍🌈 NEÓN PARTY 🏳‍🌈:</b>
          <br />
          <hr />

          Diseños a elección <br />
          Un diseño por persona <br />
          Incluye mobiliario con maletín y espejo iluminado <br />

          ❗Es importante que el lugar de la fiesta esté ambientado con la iluminación adecuada (luz negra, neón o azul) para que los maquillajes se aprecien correctamente.❗<br />
          ❗Utilizamos productos profesionales, hipoalergénicos, a base de agua sin aceites ni conservantes ❗
          <hr />
        </Typography>
      ),
      imagen: '../src/assets/img/maquillajes/neon2.jpg',
      precio: 30000
    };
  }

  const handleContratar = () => {
    setAbrirCarrito(true);
  };

  const handleBackClick = () => {
    navigate('/maquillaje');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '86vh', p: 3 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Grid item>
          <Button onClick={handleBackClick} variant="contained" sx={{ mt: 8, ml: 2 }}>
            Volver
          </Button>
        </Grid>
        <Grid item xs>
          <Typography variant="h3" align="center" mt={10} mb={3} mr={12}>
            {servicioDetallado.nombre}
          </Typography>
        </Grid>
      </Grid>

      {/* Imagen centrada */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <img
          src={servicioDetallado.imagen}
          alt={servicioDetallado.nombre}
          style={{
            maxWidth: '100%',
            maxHeight: 400,
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        />
      </Box>

      {/* Sección de descripción y precio con fondo tenue */}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Fondo blanco tenue con opacidad
          borderRadius: '12px', // Bordes redondeados
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Sombra para dar profundidad
          padding: '20px', // Espaciado interno
          width: '80%',
          margin: '0 auto', // Centramos el cuadro
          mb: 3,
        }}
      >
        {/* Descripción */}
        <Typography variant="body1" align="center" mb={3} sx={{ fontSize: '1.2rem', color: '#333' }}>
          {servicioDetallado.descripcion}
        </Typography>

        {/* Precio */}
        <Typography variant="h5" align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Precio: ${servicioDetallado.precio}
        </Typography>
      </Box>

      {/* Botón para contratar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContratar}
          component={!usuario ? Link : 'button'}
          to={!usuario ? '/login' : undefined}
          sx={{
            padding: '10px 30px',
            fontSize: '1.1rem',
            textTransform: 'none',
          }}
        >
          {!usuario ? 'Login para Contratar' : 'Contratar'}
        </Button>
      </Box>

      {/* Modal para carrito de compra */}
      {usuario && (
        <Modal
          open={abrirCarrito}
          onClose={() => setAbrirCarrito(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CarritoCompra servicio={servicioDetallado} handleClose={handleCerrarCarrito} />
        </Modal>
      )}
    </Box>
  );
};

export default PintacaritasDetalle;
