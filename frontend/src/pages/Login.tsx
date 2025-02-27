import React, { useState } from 'react'
import LoginInfo from '../interfaces/LoginInfo'
import '../styles/Login.css'
import Cookies from 'js-cookie'
const apiUrl = import.meta.env.VITE_API_URL;

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
      await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            Cookies.set('token', data.token, {expires: 1})
            window.location.href = '/'
          } else {
            alert(data.message);
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
        <input type="text"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="Email"
               required/>
        <input type="password"
               id="contraseña"
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="Contraseña"
               required/>
        <input type="submit" value="Enviar" id="submit-login"/>
        <p>¿No tienes cuenta? <a href="/registrar">Registrate</a></p>
      </form>
    </div>
  )
}

export default Login
