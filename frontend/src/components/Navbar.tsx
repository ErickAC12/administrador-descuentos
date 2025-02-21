import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <>
      <div id='navbar'>
        <div>
          <p>Default user</p> 
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
          <a href="/login">Iniciar sesión</a>
        </div>
      </div>
    </>
  )
}

export default Navbar
