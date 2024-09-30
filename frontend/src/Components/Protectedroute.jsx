import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/current-user'); // L'endpoint backend pour vérifier l'auth
        if (res.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      }
      setLoading(false); // Fin du chargement
    };
    checkAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Optionnel : Loader pendant la vérification
  }

  // Si l'utilisateur est authentifié, il peut accéder à la route
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;


