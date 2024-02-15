import { MessageModel } from "../models/message.model.js";

export class MongoMessageManager {
  addMessage = async (user, message) => {
    try {
      if ((!user, !message))
        throw new Error("Completa todos los campos requeridos");

      const newMessage = MessageModel.create({ user, message });
      return newMessage;
    } catch (error) {
      throw new Error("Error al crear un nuevo mensaje");
    }
  };

  getMessages = async () => {
    try {
      const message = await MessageModel.find({}).lean();
      if (message.lenght === 0) throw new Error("Mensaje no encontrado");
      return message;
    } catch (error) {
      throw new Error("Error while getting messages");
    }
  };
}
