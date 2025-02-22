import React, { useState } from 'react'

const Login: React.FC = () => {
  const { formData, setFormData } = useState()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  }

  return (
    <div id='login-page'>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usuario">Usuario:</label>
        <input type="text"
               id="usuario"
               required/>
        <label htmlFor="contraseña">Contraseña:</label> 
        <input type="password"
               id="contraseña"
               required/>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default Login
