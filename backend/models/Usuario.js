import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuariosAlvarez81');

export default Usuario;
