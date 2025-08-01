import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdminRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    // Se estamos na rota /admin, redirecionar para o arquivo estático
    if (location.pathname === '/admin') {
      window.location.href = '/admin/index.html';
    }
  }, [location]);

  return null;
};

export default AdminRedirect; 