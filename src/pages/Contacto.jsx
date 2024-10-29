import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

const emailServer = import.meta.env.VITE_APP_EMAIL_HOST;

const Contacto = () => {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        text: ''
    });

    const { enqueueSnackbar } = useSnackbar();
    const [textFieldFocused, setTextFieldFocused] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(emailServer, formData)
            .then(() => {
                enqueueSnackbar("Su solicitud fue enviada", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            })
            .catch(() => {
                enqueueSnackbar("Ocurrio un error al procesar su solicitud", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            });
    };

    return (
        <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          mt: 10, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%',
          maxWidth: 600, 
          mx: 'auto' 
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ mb: 3, textAlign: 'center' }} 
        >
          Envíenos su consulta
        </Typography>
      
        <TextField
          fullWidth
          label="Correo Electrónico"
          name="to"
          type="email"
          value={formData.to}
          onChange={handleChange}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Asunto"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          margin="normal"
          required
        />
      
        <TextField
          fullWidth
          label="Texto"
          name="text"
          value={formData.text}
          onChange={handleChange}
          onFocus={() => setTextFieldFocused(true)}
          margin="normal"
          multiline
          rows={4}
          required
          placeholder="Por favor ingresa un teléfono y un correo para que nos comuniquemos contigo"
          InputLabelProps={{
            shrink: textFieldFocused || formData.text !== '',
          }}
        />
      
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ mt: 3, width: '40%', mb: 3.5}} 
        >
          Enviar
        </Button>
      </Box>
      
    );
};

export default Contacto;
