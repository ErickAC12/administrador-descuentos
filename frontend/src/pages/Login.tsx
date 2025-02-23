import React, { useState } from 'react'
import LoginInfo from '../interfaces/LoginInfo'

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginInfo>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email == '' || formData.password == '') {
      alert('Por favor llene todos los campos.');
      return;
    }
    try {
      await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            window.location.href = '/'
          }
        })
    } catch (err) {
      alert('Error al iniciar sesión.');
      console.error(err);
    }
  }


  return (
    <div id='login-page'>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               required/>
        <label htmlFor="contraseña">Contraseña:</label> 
        <input type="password"
               id="contraseña"
               name="password"
               value={formData.password}
               onChange={handleChange}
               required/>
        <input type="submit" value="Enviar" />
        <p>¿No tienes cuenta? <a href="/registrar">Registrate</a></p>
      </form>
    </div>
  )
}

export default Login
