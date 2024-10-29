import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './AutentificacionProvider';
import Login from '../pages/Login';
import Registro from '../pages/Registro'
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import PerfilAdmin from '../pages/PerfilAdmin';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import Contacto from '../pages/Contacto';
import Nosotros from '../pages/Nosotros';
import Servicios from '../pages/Servicios';
import Maquillaje from '../pages/Maquillaje';
import Animaciones from '../pages/Animaciones';
import PintacaritasDetalle from '../pages/Pintacaritas';
import CumplesDetalle from '../pages/Cumples';


const Navegacion = () => {
    const { usuario, estado, logout } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, zIndex: 1000, bgcolor: '#47d6c4' }}>
                <Toolbar>
                    <a href="/">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <img src="../public/img/ByP.png" alt="Logo" style={{ maxWidth: 40, borderRadius: '50%' }} />
                        </IconButton>
                    </a>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Bienvenidos a ByP
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/nosotros">Nosotros</Button>
                            <Button color="inherit" component={Link} to="/servicios">Servicios</Button>
                            <Button color="inherit" component={Link} to="/contacto" sx={{ mr: 2 }}>Contacto</Button>
                            {!usuario && <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>Login</Button>}
                            {!usuario && <Button color="inherit" component={Link} to="/registro" sx={{ mr: 2 }}>Registro</Button>}
                            {usuario && usuario.role === 'admin' && <Button color="inherit" component={Link} to="/admin" sx={{ mr: 2 }}>Admin</Button>}
                            {usuario && <Button color="inherit" component={Link} to="/perfil" sx={{ mr: 2 }}>Perfil</Button>}
                            {usuario && <Button color="inherit" onClick={logout}>Logout</Button>}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={estado === 'logueado' ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/registro"
                    element={estado === 'logueado' ? <Navigate to="/" /> : <Registro />}
                />
                <Route
                    path="/perfil"
                    element={estado === 'logueado' ? <Perfil /> : <Navigate to="/login" />}
                />
                <Route
                    path="/admin"
                    element={estado === 'logueado' && usuario.role === 'admin' ? <PerfilAdmin /> : <Navigate to="/login" />}
                />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/maquillaje" element={<Maquillaje />} />
                <Route path="/maquillaje/:servicio" element={<PintacaritasDetalle />} />
                <Route path="/animaciones/:servicio" element={<CumplesDetalle />} />
                <Route path="/animaciones" element={<Animaciones />} />
            </Routes>
        </Box>
    );
};

export default Navegacion;
