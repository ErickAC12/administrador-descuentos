import mongoose from "mongoose";

const precioEspecialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  users: [{
    type: String,
    required: true
  }],
  timestamps: true
});

const precioEspecial = mongoose.model('PrecioEspecial', precioEspecialSchema);

export default precioEspecial;
