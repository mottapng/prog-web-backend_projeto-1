import { ObjectId } from "mongodb";
import { db } from "../database/mongo.js";
import { logError } from "../utils/logger.js";

export class Pedido {
  constructor() {
    this.collection = db.collection("pedidos");
  }

  async create(data) {
    try {
      if (!data.cliente_id || !data.loja_id || !data.produtos) {
        throw new Error("Cliente, loja e produtos são obrigatórios");
      }

      const pedido = {
        cliente_id: data.cliente_id,
        loja_id: data.loja_id,
        produtos: data.produtos,
        status: "pendente",
        dataHora: new Date().toISOString(),
        createdAt: new Date(),
      };

      const result = await this.collection.insertOne(pedido);
      return { ...pedido, id: result.insertedId };
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const pedido = await this.collection.findOne({ _id: id });
      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }
      return { ...pedido, id: pedido._id };
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async approveOrder(id) {
    try {
      const pedido = await this.findById(id);
      if (pedido.status !== "pendente") {
        throw new Error("Apenas pedidos pendentes podem ser aprovados");
      }

      const result = await this.collection.updateOne(
        { _id: id },
        { $set: { status: "aprovado" } }
      );

      if (result.modifiedCount === 0) {
        throw new Error("Erro ao aprovar pedido");
      }

      return await this.findById(id);
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async sendOrder(id) {
    try {
      const pedido = await this.findById(id);
      if (pedido.status !== "aprovado") {
        throw new Error("Apenas pedidos aprovados podem ser enviados");
      }

      const result = await this.collection.updateOne(
        { _id: id },
        { $set: { status: "enviado" } }
      );

      if (result.modifiedCount === 0) {
        throw new Error("Erro ao enviar pedido");
      }

      return await this.findById(id);
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const result = await this.collection.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new Error("Pedido não encontrado");
      }
      return true;
    } catch (error) {
      logError(error);
      throw error;
    }
  }
}
