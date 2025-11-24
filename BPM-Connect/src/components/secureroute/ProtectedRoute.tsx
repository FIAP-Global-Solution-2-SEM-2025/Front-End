import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContexts';


interface ProtectedRouteProps {
  children: React.ReactNode;
  tipoRequerido?: 'CANDIDATO' | 'EMPRESA';
}

export function ProtectedRoute({ children, tipoRequerido }: ProtectedRouteProps) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (tipoRequerido && usuario.tipo !== tipoRequerido) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}