import { ObjectId } from "mongodb";
import { getCollection } from "../database/mongo.js";
import { logError } from "../utils/logger.js";

export async function createLoja(data) {
  try {
    if (!data.nome || !data.endereco) {
      throw new Error("'nome' e 'endereco' são obrigatórios");
    }

    const loja = {
      nome: data.nome,
      endereco: data.endereco,
      produtos: data.produtos || [],
      createdAt: new Date(),
    };

    await getCollection("lojas").insertOne(loja);
    return { ...loja };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function findLojaById(id) {
  try {
    const objectId = new ObjectId(id);
    const loja = await getCollection("lojas").findOne({ _id: objectId });
    if (!loja) {
      throw new Error("Loja não encontrada");
    }
    return { ...loja };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function updateLojaById(id, data) {
  try {
    const objectId = new ObjectId(id);

    const update = {
      nome: data.nome,
      endereco: data.endereco,
      produtos: data.produtos,
    };

    const result = await getCollection("lojas").updateOne(
      { _id: objectId },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      throw new Error("Loja não encontrada");
    } 

    return { ...data, _id: id };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function deleteLojaById(id) {
  try {
    const objectId = new ObjectId(id);
    const result = await getCollection("lojas").deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new Error("Loja não encontrada");
    }
    return true;
  } catch (error) {
    logError(error);
    throw error;
  }
}
