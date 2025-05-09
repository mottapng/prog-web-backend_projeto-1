import { ObjectId } from "mongodb";
import { db } from "../database/mongo.js";
import { logError } from "../utils/logger.js";

export class Loja {
  constructor() {
    this.collection = db.collection("lojas");
  }

  async create(data) {
    try {
      if (!data.nome || !data.endereco) {
        throw new Error("Nome e endereço são obrigatórios");
      }

      const loja = {
        nome: data.nome,
        endereco: data.endereco,
        produtos: data.produtos || [],
        createdAt: new Date(),
      };

      const result = await this.collection.insertOne(loja);
      return { ...loja, id: result.insertedId };
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const loja = await this.collection.findOne({ _id: id });
      if (!loja) {
        throw new Error("Loja não encontrada");
      }
      return { ...loja, id: loja._id };
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const result = await this.collection.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new Error("Loja não encontrada");
      }
      return true;
    } catch (error) {
      logError(error);
      throw error;
    }
  }
}
