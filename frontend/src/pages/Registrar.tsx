import React, { useState } from 'react'
import RegistroInfo from '../interfaces/RegistroInfo'

const Registrar: React.FC = () => {
  const [formData, setFormData] = useState<RegistroInfo>({
    username: '',
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
    if (formData.username == '' || formData.email == '' || formData.password == '') {
      alert('Por favor llene todos los campos.');
      return;
    }
    try {
      await fetch(`http://localhost:5000/api/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            window.location.href = '/';
          } else {
            alert('Ya existe un usuario con este email.');
          }
        })
    } catch (err) {
      alert('Error al crear cuenta.');
      console.error(err);
    }
  }

  return (
    <div id='login-page'>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input type="text"
               id="username"
               name="username"
               value={formData.username}
               onChange={handleChange}
               required/>
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
        <p>¿Tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  )
}

export default Registrar
