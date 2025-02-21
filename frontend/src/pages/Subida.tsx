import React, { useState } from 'react'
import PrecioEspecial from '../interfaces/PrecioEspecial'
import './Subida.css'

const Subida: React.FC = () => {
  const [formData, setFormData] = useState<PrecioEspecial>({
    id: '',
    price: 0,
    user: ''
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
    if (formData.id == '' || formData.price == 0 || formData.user == '') {
      alert("Datos inválidos.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/producto/${formData.id}`);
      const data = await response.json();
  
      if (data) {
        const formDataCopy = { ...formData, currencyPrice: formData.currencyPrice?.toUpperCase() }

        await fetch(`http://localhost:5000/api/precioespecial`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataCopy)
        });
        alert("Precio especial subido.");
      }
    } catch (err) {
      console.error(err);
      alert("ID no existente.");
    }
  }

  return (
    <div id="Subida">
      <h2>Formulario subida</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:  </label>
        <input type="text"
               id="id"
               name="id"
               value={formData.id}
               onChange={handleChange}
               required/>
        <br /><br />
        <label htmlFor="nuevoPrecio">Nuevo Precio:  </label>
        <input type="number"
               id="nuevoPrecio"
               name="price"
               value={formData.price}
               onChange={handleChange}
               required/>
        <br /><br />
        <label htmlFor="tipoMoneda">Tipo de Moneda (predeterminado USD):  </label>
        <input type="text"
               id="tipoMoneda"
               name="currencyPrice"
               value={formData.currencyPrice?.toUpperCase()}
               onChange={handleChange}/>
        <br /><br />
        <label htmlFor="usuario">Usuario:  </label>
        <input type="text"
               id="usuario"
               name="user"
               value={formData.user}
               onChange={handleChange}
               required/>
        <br /><br />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default Subida;
