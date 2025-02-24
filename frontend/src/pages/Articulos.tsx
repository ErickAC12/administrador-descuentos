import React, { useEffect, useState } from 'react'
import Producto from '../interfaces/Producto';
import './Articulos.css'
import { useUserContext } from '../context/useUserContext';

const Articulos: React.FC = () => {
  const [data, setData] = useState<Producto[]>([]);
  const {user} = useUserContext();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos');
        const productos = await response.json();

        const updatedProductos = await Promise.all(productos.map(async (producto: Producto) => {
          const precioEspecialResponse = await fetch(`http://localhost:5000/api/precioespecial/${producto._id}`);
          if (precioEspecialResponse.ok) {
            const precioEspecial = await precioEspecialResponse.json();
            if (precioEspecial.users.includes(user?.id)) {
              producto.price = precioEspecial.price;
            }
          }
          return producto;
        }));

        setData(updatedProductos);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProductos();
  }, [user?.id]);

  return (
    <div id="Articulos">
      {data.length > 0 ? (
        <table id="tabla-articulos">
          <tr>
            <th>Id</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Diponibles</th>
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
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default Articulos
