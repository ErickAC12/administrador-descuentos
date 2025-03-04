import React, { useEffect } from 'react'
import '../styles/Navbar.css'
import { useUserContext } from '../context/useUserContext'
import Cookies from 'js-cookie'
const apiUrl = import.meta.env.VITE_API_URL;

const Navbar: React.FC = () => {
  const {user, setUser} = useUserContext();

  useEffect(() => {
      const fetchTokenInfo = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/tokeninfo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: Cookies.get('token')}),
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
          {user?.id ? 
          (<div>
            <a href="/subida">Subida</a>
          </div>) : null}
        </div>
        <div>
          <a href={user?.username ? "/logout" : "/login"}>{user?.username ? "Cerrar sesión": "Iniciar sesión"}</a>
        </div>
      </div>
    </>
  )
}

export default Navbar
