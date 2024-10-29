import { createContext, useState, useContext } from 'react';


const AuthContext = createContext();


const AutentificacionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [estado, setEstado] = useState('deslogueado');

  const login = (usuario) => {
    setUsuario(usuario);
    setEstado('logueado');
  };

  const logout = () => {
    setUsuario(null);
    setEstado('deslogueado');
  };

  return (
    <AuthContext.Provider value={{ usuario, estado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
// Es un hook personalizado que en este caso devuelve el contexto
// El objetivo es simplificar el uso de las funciones de autentificación
// ya que es vez de tener que evocar useContext(AuthContext)
// simplemente se usa useAuth
const useAuth = () => useContext(AuthContext);

export { AutentificacionProvider, useAuth };
