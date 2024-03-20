import { UserModel } from "../models/user.model.js";

export class MongoUserManager {
  register = async (user) => {
    try {
      const { first_name, last_name, email, password, role = "user" } = user;
      const existsEmail = await UserModel.findOne({ email });
      if (existsEmail) throw new Error("Usuario existente");
      const newUser = UserModel.create({
        first_name,
        last_name,
        email,
        password,
        role,
      });
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  login = async (user) => {
    try {
      const { email, password } = user;
      const existingUser = await UserModel.findOne({ email });

      if (!existingUser || existingUser.password !== password)
        throw new Error("Email y/o contraseña incorrectas");

      const userData = {
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        email: existingUser.email,
        role: existingUser.role,
      };
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
