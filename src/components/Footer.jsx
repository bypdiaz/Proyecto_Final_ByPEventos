import { Grid, Typography } from '@mui/material';
import { Facebook, Instagram, WhatsApp, Phone, Room } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#47d6c4', color: 'white', padding: '10px 0', marginTop: '25px', width: '100%' }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <Phone style={{ fontSize: 18, marginRight: 5 }} />  3886 502000 &nbsp;&nbsp;&nbsp;
            <Room style={{ fontSize: 18, marginRight: 5 }} /> Libertador General San Martin, Ledesma, Jujuy
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
          <a href="https://www.facebook.com/byp.eventos.2023" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', marginRight: 10 }}>
            <Facebook style={{ fontSize: 30 }} />
          </a>
          <a href="https://www.instagram.com/byp__eventos" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', marginRight: 10 }}>
            <Instagram style={{ fontSize: 30 }} />
          </a>
          <a href="https://wa.me/543886502000" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', marginRight: 10 }}>
            <WhatsApp style={{ fontSize: 30 }} />
          </a>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
