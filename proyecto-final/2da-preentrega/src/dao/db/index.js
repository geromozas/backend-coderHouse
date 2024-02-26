import mongoose from "mongoose";

export const dataBaseConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://mozasgeronimo:4715147@proyectocoder.hoo0h1r.mongodb.net/ecommerce"
    )
    .then(() => {
      console.log("Base de datos conectada");
    })
    .catch((err) => {
      console.log(err);
    });
};
