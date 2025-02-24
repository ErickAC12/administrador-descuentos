import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import PrecioEspecial from './models/PrecioEspecial.js';
import Usuario from './models/Usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TOKEN_SECRET } from './config.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = 5000;

import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


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

// Un solo producto
app.get('/api/producto/:id', async (req, res) => {
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
})

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
});

// Un solo precio especial con product_id
app.get('/api/precioespecial/:productid', async (req, res) => {
  try {
    const {productid} = req.params;

    const precioEspecial = await PrecioEspecial.findOne({product_id: productid});

    if (!precioEspecial) return res.status(404).json({ message: 'Precio especial no encontrado'});

    res.status(200).json(precioEspecial);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error de servidor');
  }
})

//Editar precio especial
app.put('/api/precioespecial/:id', async (req, res) => {
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
});

// Borrar precio especial
app.delete('/api/precioespecial/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await PrecioEspecial.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Precio especial eliminado" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Precio especial no encontrado" });
  }
});

// Iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ email });
    if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario no encontrado." });

    const isMatch = await bcrypt.compare(password, usuarioEncontrado.password);

    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta." });

    jwt.sign({
      id: usuarioEncontrado._id,
      username: usuarioEncontrado.username
    },
    TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
    (err, token) => {
      if (err) console.log(err);
      res.cookie('token', token);
      res.json({
        success: true
      })
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Registrar nuevo usuario
app.post('/api/registrar', async (req, res) => {
  const { username, email, password } = req.body;

  const usuarioExiste = Usuario.findOne({email});

  if (usuarioExiste) return res.json({success: false});

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      username,
      email,
      password: passwordHash
    })

    const usuarioGuardado = await nuevoUsuario.save();

    jwt.sign({
      id: usuarioGuardado._id,
      username: usuarioGuardado.username
    },
    TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
    (err, token) => {
      if (err) console.log(err);
      res.cookie('token', token);
      res.json({
        message: 'Usuario creado.'
      })
    });

    res.json({
        success: true
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Cerrar sesión
app.post('/api/logout', (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  });
  return res.json({success: true});
})

// Conseguir información del token
app.get('/api/tokeninfo', (req, res) => {
  const { token } = req.cookies;

  if (!token) return;

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ message: err.message });

    res.json({id: user.id, username: user.username});
  })
})
