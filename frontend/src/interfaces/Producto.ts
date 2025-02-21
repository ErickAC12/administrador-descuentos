interface Producto {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  currencyPrice?: string;
  brand?: string;
  sku?: string;
  tags?: [string];
  createdAt?: string;
  updatedAt?: string;
}

export default Producto;
