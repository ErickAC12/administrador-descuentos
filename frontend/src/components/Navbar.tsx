import React, { useEffect } from 'react'
import '../styles/Navbar.css'
import { useUserContext } from '../context/useUserContext'

const Navbar = () => {
  const {user, setUser} = useUserContext();

  useEffect(() => {
      const fetchTokenInfo = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/tokeninfo', {
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch token info');
          }
          const data = await response.json();
          setUser(data);
        } catch (err) {
          console.log(err);
        }
      };
      
      fetchTokenInfo();
    }, [setUser]);

  return (
    <>
      <div id='navbar'>
        <div>
          <p>{user?.username ? user.username : ''}</p> 
        </div>
        <div className='secciones'>
          <div>
            <a href="/">Artículos</a>
          </div>
          <div>
            <a href="/subida">Subida</a>
          </div>
        </div>
        <div>
          <a href={user?.username ? "/logout" : "/login"}>{user?.username ? "Cerrar sesión": "Iniciar sesión"}</a>
        </div>
      </div>
    </>
  )
}

export default Navbar
