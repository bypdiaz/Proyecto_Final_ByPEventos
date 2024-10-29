import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Modal, Grid } from '@mui/material';
import { useAuth } from '../components/AutentificacionProvider';
import CarritoCompra from '../components/CarritoCompra';

const CumplesDetalle = () => {
  const { servicio } = useParams();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [abrirCarrito, setAbrirCarrito] = useState(false);

  const handleCerrarCarrito = () => {
    setAbrirCarrito(false);
  };

  let servicioDetallado = {};
  if (servicio === 'cumples-infantiles') {
    servicioDetallado = {
      id: 5,
      nombre: 'Cumples Infantiles',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>

          <b>🥳 COMBO ANIMACION INFANTIL 🥳</b>
          <br />
          <hr />
          Recepción de pintacaritas x2h animación, juegos y competencias acorde a la edad de los niños x1h <br />
          🥳Bailamos con Bazoka de burbujas <br />
          🥳Incluye sonido estándar y musicalización durante todo el evento <br />
          🥳1 coordinador <br />
          🥳Escenografia con telón arcoiris y luces de colores <br />
          Te ayudamos al momento de las piñatas, feliz cumple y entrega de bolsitas <br />
          Duracion total de servicio: 4 horas
          <hr />
        </Typography>
      ),
      imagen: '../src/assets/img/animaciones/cumples-infantiles.jpg',
      precio: 80000
    };
  }

  if (servicio === 'jardincitos') {
    servicioDetallado = {
      id: 6,
      nombre: 'Jardincitos',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>

          <b>🎉JARDINCITOS🎉</b>
          <br />
          <hr />
          🪁Show con actividades lúdicas  donde a través del <br />
          juego se busca estimular destrezas motoras, expresivas y creativas del niño 🪁
          <hr />
        </Typography>
      ),

      imagen: '../src/assets/img/animaciones/jardincitos.jpg',
      precio: 100000
    };
  }

  if (servicio === 'desafio-aqua') {
    servicioDetallado = {
      id: 7,
      nombre: 'Desafío Aqua',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>

          <b>🌊DESAFIO AQUA🌊</b>
          <br />
          <hr />
          ⛱️Juegos y competencias  para mojarse x1h <br />
          ⛱️Actividades dentro y fuera de la pile <br />
          ⛱️Pista jabonosa <br />
          ⛱️Bazooka de Burbujas  y mucho más <br />
          ⛱️1 coordinador <br />
          ⛱️Te ayudamos al momento de las piñatas, feliz cumple y entrega de bolsitas <br />
          ⛱️incluye sonido estandar+ micrófono y musicalización durante el show <br />
          ⛱️Luces ambientales de colores<br />
          🕒Duracion total del servicio: 90 minutos
          <hr />
        </Typography>
      ),

      imagen: '../src/assets/img/animaciones/desafio-aqua.jpg',
      precio: 60000
    };
  }

  if (servicio === 'asking-game') {
    servicioDetallado = {
      id: 8,
      nombre: 'Asking Game',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>

          <b>🎬ASKING GAME🎬</b>
          <br />
          <hr />
          🎙️Un show totalmente diferente a todo lo que viste antes🎙️ <br />
          🎙️Reto de preguntas, respuestas y desafíos <br />
          🎙️Diversión garantizada para pasar un buen momento en familia o con amigos <br />
          🎙️Ideal para edades entre 9-14 años <br />
          <hr />
        </Typography>
      ),

      imagen: '../src/assets/img/animaciones/superasking.jpg',
      precio: 100000
    };
  }

  if (servicio === 'baby-shower') {
    servicioDetallado = {
      id: 9,
      nombre: 'Baby Shower',
      descripcion: (
        <Typography sx={{ textAlign: 'center', fontSize: '4vh' }}>

          <b>🍼BABY SHOWER🍼</b>
          <br />
          <hr />
          👶Te ofrecemos un show imperdible con diversion garantizada👶 <br />
          👶🏻Recepción de maquillajes artísticos temático x1h. Incluye mobiliario maletín con espejo iluminado <br />
          👶🏻juegos y competencias x90minutos a pura diversión y 100% entretenimiento <br />
          👉🏻NO TE PIERDAS EL GRAN VERSUS DE FAMILIAS EN EL RETO DE PREGUNTAS <br />
          ❗Y cuidado🫣 El que pierde se enfrenta al Prenda🥃 ó Paga💰❗<br />
          👶🏻1 coordinador <br />
          👶🏻Incluye sonido estándar+ micrófono y musicalización durante todo el evento <br />
          👶🏻Luces ambientales de colores<br />
          👶🏻Escenografía con Banner, cambiador y pulsador.<br />
          👶🏻También incluye todos los elementos para realizar los juegos (muñecos, ropitas, mamaderas etc.)<br />

          🚫 SHOW NO APTO PARA NIÑOS 🚫 <br />
          <hr />
        </Typography>
      ), 
      
      imagen: '../src/assets/img/animaciones/babyshower.jpg',
      precio: 80000
    };
  }

  const handleContratar = () => {
    if (!usuario) {
      // Si no está autenticado, redirigir al login
      console.log('Redirigir al login');
    } else {
      // Si está autenticado, abrir carrito de compra
      console.log('Abrir carrito de compra');
      setAbrirCarrito(true);
    }
  };

  const handleBackClick = () => {
    navigate('/animaciones');
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

export default CumplesDetalle;
