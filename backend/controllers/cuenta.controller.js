import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { TOKEN_SECRET } from "../config.js";

export async function iniciarSesion(req, res) {
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
}

export async function registrar(req, res) {
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
}

export function cerrarSesion(req, res) {
  res.cookie('token', '', {
    expires: new Date(0)
  });
  return res.json({success: true});
}
