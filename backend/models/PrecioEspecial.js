import mongoose from "mongoose";

const precioEspecialSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currencyPrice: {
    type: String,
    required: false
  },
  user: {
    type: String,
    required: true
  },
}, { timestamps: true });

const PrecioEspecial = mongoose.model('PrecioEspecial', precioEspecialSchema, 'preciosEspecialesAlvarez81');

export default PrecioEspecial;
