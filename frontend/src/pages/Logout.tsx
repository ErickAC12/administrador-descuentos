import React, { useEffect } from 'react'
import { useUserContext } from '../context/useUserContext'

const Logout: React.FC = () => {
  const {setUser} = useUserContext();


  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Error al cerrar sesión');

        setUser(null);
        window.location.href = '/'
      } catch (error) {
        console.log(error);
      }
    }

    performLogout();
  }, [setUser])

  return (
    <p>Cargando...</p>
  )
}

export default Logout
