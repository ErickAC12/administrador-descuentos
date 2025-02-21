import React, { useEffect, useState } from 'react'
import Producto from '../interfaces/Producto';
import './Articulos.css'

const Articulos: React.FC = () => {
  const [data, setData] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/productos')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error(err))
  }, []);

  console.log(data);

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
            {data.map((producto:Producto) => producto.currencyPrice ? (
                <tr key={producto._id}>
                  <td>{producto._id}</td>
                  <td>{producto.name}</td>
                  <td>{producto.category}</td>
                  <td>${producto.price} {producto.currencyPrice}</td>
                  <td>{producto.stock}</td>
                </tr>
            ) :(
                <tr key={producto._id}>
                  <td>{producto._id}</td>
                  <td>{producto.name}</td>
                  <td>{producto.category}</td>
                  <td>${producto.price} USD</td>
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
