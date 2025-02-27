import React from 'react'
import { useUserContext } from '../context/useUserContext'
import Cookies from 'js-cookie'

const Logout: React.FC = () => {
  const {setUser} = useUserContext();

  setUser(null);
  Cookies.remove('token');
  window.location.href = '/'

  return (
    <p>Cargando...</p>
  )
}

export default Logout
