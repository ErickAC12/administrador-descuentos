import PrecioEspecial from "../models/PrecioEspecial.js";
import connectToMongoDB from "../db/MongoDB.js";

export async function todosLosPreciosEspeciales(req, res) {
  try {
    const db = await connectToMongoDB();
    const preciosEspecialesCollection = db.collection('preciosEspecialesAlvarez81');
    const preciosEspeciales = await preciosEspecialesCollection.find().toArray();
    res.json(preciosEspeciales);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error de servidor');
  }
}

export async function añadirPrecioEspecial(req, res) {
  const precioEspecial = req.body;

  if (!precioEspecial.product_id || !precioEspecial.price || !precioEspecial.users){
    return res.status(400).json({ success: false, message: "Por favor añada todos los campos "})
  }

  const nuevoPrecioEspecial = new PrecioEspecial({...precioEspecial, users: [precioEspecial.users]});

  try {
    await nuevoPrecioEspecial.save();
    res.status(201).json({ success: true, obj: nuevoPrecioEspecial })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Error al guardar la información"})
  }
}

export async function unPrecioEspecial(req, res) {
  try {
    const {productid} = req.params;

    const precioEspecial = await PrecioEspecial.findOne({product_id: productid});

    if (!precioEspecial) return res.status(404).json({ message: 'Precio especial no encontrado'});

    res.status(200).json(precioEspecial);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error de servidor');
  }
}

export async function editarPrecioEspecial(req, res) {
  const { id } = req.params;
  const { price, users } = req.body;
  const updateFields = {price: price};

  try {
    const existentePrecioEspecial = await PrecioEspecial.findOne({product_id: id});

    if (users && users.trim() !== '' && !existentePrecioEspecial.users.includes(users)) {
      updateFields.users = [...existentePrecioEspecial.users, users];
    }

    const nuevoPrecioEspecial = await PrecioEspecial.findOneAndUpdate({product_id: id}, {
      $set: updateFields
    }, { new: true });

    res.status(200).json({ success: true, obj: nuevoPrecioEspecial });
  } catch (error) {
    res.status(500).json({ success: false, message: "Datos inválidos" });
  }
}

export async function eliminarPrecioEspecial(req, res) {
  const { id } = req.params;

  try {
    await PrecioEspecial.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Precio especial eliminado" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Precio especial no encontrado" });
  }
}
