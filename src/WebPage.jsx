import { BrowserRouter as Router } from 'react-router-dom';
import { AutentificacionProvider } from './components/AutentificacionProvider';
import Navegacion from './components/Navegacion';
import { CssBaseline } from '@mui/material';
import './styles/WebPage.css';
import { SnackbarProvider } from 'notistack';
import Footer from './components/Footer';

function WebPage() {
  return (
    <>
      <AutentificacionProvider>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}>
          <Router>
            <Navegacion />
          </Router>
        </SnackbarProvider>
      </AutentificacionProvider>
      <Footer />
    </>
  );
}

export default WebPage;
