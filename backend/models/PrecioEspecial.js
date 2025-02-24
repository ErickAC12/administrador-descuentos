import mongoose from "mongoose";

const precioEspecialSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  users: {
    type: [String],
    required: true
  },
}, { timestamps: true });

const PrecioEspecial = mongoose.model('PrecioEspecial', precioEspecialSchema, 'preciosEspecialesAlvarez81');

export default PrecioEspecial;
