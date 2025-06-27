import { ObjectId } from "mongodb";
import { getCollection } from "../database/mongo.js";
import { logError } from "../utils/logger.js";

export async function createCliente(data) {
  try {
    if (!data.nome || !data.email || !data.endereco) {
      throw new Error("'nome', 'email' e 'endereco' são obrigatórios");
    }

    const cliente = {
      nome: data.nome,
      email: data.email,
      endereco: data.endereco,
      createdAt: new Date(),
    };

    await getCollection("clientes").insertOne(cliente);
    return { ...cliente };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function findClienteById(id) {
  try {
    const objectId = new ObjectId(id);
    const cliente = await getCollection("clientes").findOne({ _id: objectId });
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    return { ...cliente };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function updateClienteById(id, data) {
  try {
    const objectId = new ObjectId(id);

    const update = {
      nome: data.nome,
      email: data.email,
      endereco: data.endereco,
    };

    const result = await getCollection("clientes").updateOne(
      { _id: objectId },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      throw new Error("Cliente não encontrado");
    } 

    return { ...data, _id: id };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function deleteClienteById(id) {
  try {
    const objectId = new ObjectId(id);
    const result = await getCollection("clientes").deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new Error("Cliente não encontrado");
    }
    return true;
  } catch (error) {
    logError(error);
    throw error;
  }
}