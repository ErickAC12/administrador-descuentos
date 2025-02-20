import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import PrecioEspecial from './models/PrecioEspecial.js';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

// Conexión con MongoDB con mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');

    app.listen(port, () => {
      console.log(`Server iniciado en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB:', error);
  });

// Conexión con MongoDB con client (para mostrar todos los elementos de colección)
async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client.db('tienda');
}

// Todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const productosCollection = db.collection('productos');
    const productos = await productosCollection.find().toArray();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error de servidor');
  }
});
// Todos los precios especiales
app.get('/api/preciosespeciales/', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const preciosEspecialesCollection = db.collection('preciosEspecialesAlvarez81');
    const preciosEspeciales = await preciosEspecialesCollection.find().toArray();
    res.json(preciosEspeciales);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error de servidor');
  }
});

// Añadir precio especial
app.post('/api/precioespecial', async (req, res) => {
  const precioEspecial = req.body;

  if (!precioEspecial.name || !precioEspecial.price || !precioEspecial.users){
    return res.status(400).json({ success: false, message: "Por favor añada todos los campos "})
  }

  const nuevoPrecioEspecial = new PrecioEspecial(precioEspecial);

  try {
    await nuevoPrecioEspecial.save();
    res.status(201).json({ success: true, obj: nuevoPrecioEspecial })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error al guardar la información"})
  }
});
