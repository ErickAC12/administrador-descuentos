import React, { useEffect, useState } from 'react'
import Producto from '../interfaces/Producto';
import '../styles/Articulos.css'
import { useUserContext } from '../context/useUserContext';
const apiUrl = import.meta.env.VITE_API_URL;

const Articulos: React.FC = () => {
  const [data, setData] = useState<Producto[]>([]);
  const {user} = useUserContext();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/productos`);
        const productos = await response.json();
        if (user?.id){
          const updatedProductos = await Promise.all(productos.map(async (producto: Producto) => {
            const precioEspecialResponse = await fetch(`${apiUrl}/api/precioespecial/${producto._id}`);
            if (precioEspecialResponse.ok) {
              const precioEspecial = await precioEspecialResponse.json();
              if (precioEspecial.users.includes(user?.id)) {
                producto.price = precioEspecial.price;
              }
            }
            return producto;
          }));
          setData(updatedProductos);
        } else {
          setData(productos);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchProductos();
  }, [user?.id])

  return (
    <div id="Articulos">
      {data.length > 0 ? (
        <table id="tabla-articulos">
          <tr id="tabla-headings">
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Disponibles</th>
          </tr>
            {data.map((producto:Producto) =>
              (<tr key={producto._id}>
                <td>{producto._id}</td>
                <td>{producto.name}</td>
                <td>{producto.category}</td>
                <td>${producto.price}</td>
                <td>{producto.stock}</td>
              </tr>
            ))}
        </table>
      ): (
        <p id='cargando'>Cargando...</p>
      )}
    </div>
  )
}

export default Articulos
