import mongoose from "mongoose";
import { app } from "../server.js";
import { PORT } from "../config.js";

export default function connectMongoose(){
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Conexión exitosa a MongoDB');

      app.listen(PORT, () => {
        console.log(`Server iniciado en http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error al conectar con MongoDB:', error);
    });
}
