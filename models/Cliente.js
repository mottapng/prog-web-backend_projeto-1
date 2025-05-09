import { ObjectId } from "mongodb";
import { db } from "../database/mongo.js";
import { logError } from "../utils/logger.js";

export class Cliente {
  constructor() {
    this.collection = db.collection("clientes");
  }

  async create(data) {
    try {
      if (!data.nome || !data.email || !data.endereco) {
        throw new Error("Nome, email e endereço são obrigatórios");
      }

      const cliente = {
        nome: data.nome,
        email: data.email,
        endereco: data.endereco,
        createdAt: new Date(),
      };

      const result = await this.collection.insertOne(cliente);
      return { ...cliente, id: result.insertedId };
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const cliente = await this.collection.findOne({ _id: id });
      if (!cliente) {
        throw new Error("Cliente não encontrado");
      }
      return { ...cliente, id: cliente._id };
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const result = await this.collection.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new Error("Cliente não encontrado");
      }
      return true;
    } catch (error) {
      logError(error);
      throw error;
    }
  }
}
