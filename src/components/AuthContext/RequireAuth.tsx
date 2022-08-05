import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from './AuthContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(userContext);
  if (!auth.username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
