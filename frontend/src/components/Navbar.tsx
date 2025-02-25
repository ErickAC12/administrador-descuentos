import React, { useEffect } from 'react'
import '../styles/Navbar.css'
import { useUserContext } from '../context/useUserContext'
const apiUrl = import.meta.env.VITE_API_URL;

const Navbar: React.FC = () => {
  const {user, setUser} = useUserContext();

  useEffect(() => {
      const fetchTokenInfo = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/tokeninfo`, {
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
          {user?.id ? <a href="/subida">Subida</a> : <></>}
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
