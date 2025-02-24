import connectToMongoDB from "../db/MongoDB.js";
import { ObjectId } from "mongodb";

export async function todosLosProductos(req, res) {
  try {
    const db = await connectToMongoDB();
    const productosCollection = db.collection('productos');
    const productos = await productosCollection.find().toArray();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error de servidor');
  }
}

export async function unProducto(req, res) {
  try {
    const {id} = req.params;
    const db = await connectToMongoDB();
    const productosCollection = db.collection('productos');
    const producto = await productosCollection.findOne({ _id: new ObjectId(id) })
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error de servidor');
  }
}
