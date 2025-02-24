import React, { useState } from 'react'
import RegistroInfo from '../interfaces/RegistroInfo'
import '../styles/Registrar.css'

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
        body: JSON.stringify(formData),
        credentials: 'include'
      })
        .then(response => response.json())
        .then(async data => {
          if (data.success) {
            try {
              await fetch(`http://localhost:5000/api/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({email: formData.email, password: formData.password}),
              credentials: 'include'
              })
                .then(responseLogin => responseLogin.json())
                .then(dataLogin => {
                  if (dataLogin.success) {
                    window.location.href = '/'
                  }
                })  
            } catch (error) {
              alert("No se pudo iniciar sesión.");
              console.error(error);
            }
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
    <div id='registrar-page'>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
               id="username"
               name="username"
               value={formData.username}
               onChange={handleChange}
               placeholder="Usuario"
               required/>
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
        <input type="submit" value="Enviar" id="submit-registrar"/>
        <p>¿Tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  )
}

export default Registrar
