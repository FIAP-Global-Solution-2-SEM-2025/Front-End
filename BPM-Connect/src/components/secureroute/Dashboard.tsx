import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContexts';
import { Layout } from '../layout/Layout';


export function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      if (usuario.tipo === 'EMPRESA') {
        navigate('/dashboard/empresa', { replace: true });
      } else {
        navigate('/dashboard/candidato', { replace: true });
      }
    }
  }, [usuario, navigate]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </Layout>
  );
}