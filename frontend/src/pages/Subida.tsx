import React, { useEffect, useState } from 'react'
import PrecioEspecial from '../interfaces/PrecioEspecial'
import '../styles/Subida.css'
import { useUserContext } from '../context/useUserContext'
const apiUrl = import.meta.env.VITE_API_URL;

const Subida: React.FC = () => {
  const {user} = useUserContext();
  const [formData, setFormData] = useState<PrecioEspecial>({
    product_id: '',
    price: 0,
    users: user?.id || ''
  })

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      users: user?.id || prevData.users
    }))
  }, [setFormData, user?.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.product_id === '' || formData.price === 0) {
      alert("Datos inválidos.");
      return;
    }

    try {
      const productResponse = await fetch(`${apiUrl}/api/producto/${formData.product_id}`);
      if (!productResponse.ok) {
        throw new Error("ID de producto no existente.");
      }

      const precioEspecialResponse = await fetch(`${apiUrl}/api/precioespecial/${formData.product_id}`);
        console.log(1)

      let result;
      if (precioEspecialResponse.ok) {
        result = await fetch(`${apiUrl}/api/precioespecial/${formData.product_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        console.log(2)
      } else {
        result = await fetch(`${apiUrl}/api/precioespecial`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        console.log(formData.users)
        console.log(3)
      }

      if (result?.ok) {
        alert('Precio especial subido.');
      } else {
        alert('Error al subir precio especial.');
      }

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  }

  return (
    <div id="Subida">
      <h1>Subir descuento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product_id">ID de producto:  </label>
          <input type="text"
                 id="product_id"
                 name="product_id"
                 value={formData.product_id}
                 onChange={handleChange}
                 required/>
        </div>
        <div>
          <label htmlFor="nuevoPrecio">Nuevo Precio:  </label>
          <input type="number"
                 id="nuevoPrecio"
                 name="price"
                 value={formData.price}
                 onChange={handleChange}
                 required/>
        </div>
        <div>
          <label htmlFor="usuario">ID de usuario:  </label>
          <input type="text"
                 id="usuario"
                 name="users"
                 defaultValue={user?.id}
                 onChange={handleChange}/>
        </div>
        <input type="submit" value="Enviar" id="submit-subida"/>
      </form>
    </div>
  )
}

export default Subida;
