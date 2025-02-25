import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { todosLosProductos, unProducto } from './controllers/productos.controller.js';
import connectMongoose from './db/Mongoose.js';
import { añadirPrecioEspecial, editarPrecioEspecial, eliminarPrecioEspecial, todosLosPreciosEspeciales, unPrecioEspecial } from './controllers/preciosEspeciales.controller.js';
import { cerrarSesion, iniciarSesion, registrar } from './controllers/cuenta.controller.js';
import { infoToken } from './controllers/token.controller.js';

dotenv.config();

export const app = express();

import cors from 'cors';

app.use(cors({
  origin: "https://administrador-descuentos.onrender.com",
  optionsSuccessStatus: 200,
  credentials: true
}));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "https://administrador-descuentos.onrender.com");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use(express.json());
app.use(cookieParser());


// Conexión con MongoDB con mongoose
connectMongoose();

// Todos los productos
app.get('/api/productos', todosLosProductos);

// Un solo producto
app.get('/api/producto/:id', unProducto);

// Todos los precios especiales
app.get('/api/preciosespeciales/', todosLosPreciosEspeciales);

// Añadir precio especial
app.post('/api/precioespecial', añadirPrecioEspecial);

// Un solo precio especial con product_id
app.get('/api/precioespecial/:productid', unPrecioEspecial)

//Editar precio especial
app.put('/api/precioespecial/:id', editarPrecioEspecial);

// Borrar precio especial
app.delete('/api/precioespecial/:id', eliminarPrecioEspecial);

// Iniciar sesión
app.post('/api/login', iniciarSesion)

// Registrar nuevo usuario
app.post('/api/registrar', registrar)

// Cerrar sesión
app.post('/api/logout', cerrarSesion)

// Conseguir información del token
app.get('/api/tokeninfo', infoToken)
