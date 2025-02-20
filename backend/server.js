import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

// Conexión con MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  console.log('Conectado a MongoDB');
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
  }
});

app.get('/api/')

app.listen(5000, () => {
  console.log('Server iniciado en http://localhost:5000');
})
