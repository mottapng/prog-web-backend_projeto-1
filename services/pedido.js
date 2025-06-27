import { ObjectId } from "mongodb";
import { getCollection } from "../database/mongo.js";
import { logError } from "../utils/logger.js";

export async function createPedido(data) {
  try {
    if (!data.cliente_id || !data.loja_id || !data.produtos) {
      throw new Error("'cliente_id', 'loja_id' e 'produtos' são obrigatórios");
    }

    const pedido = {
      cliente_id: new ObjectId(data.cliente_id),
      loja_id: new ObjectId(data.loja_id),
      produtos: data.produtos,
      status: "pendente",
      createdAt: new Date(),
    };

    await getCollection("pedidos").insertOne(pedido);
    return { ...pedido };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function findPedidoById(id) {
  try {
    const objectId = new ObjectId(id);
    const pedido = await getCollection("pedidos").findOne({ _id: objectId });
    if (!pedido) {
      throw new Error("Pedido não encontrado");
    }
    return { ...pedido, id: pedido._id };
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function updatePedidoById(id, data) {
  try {
    const objectId = new ObjectId(id);

    const update = {
      produtos: data.produtos,
    };

    const result = await getCollection("pedidos").updateOne(
      { _id: objectId },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      throw new Error("Pedido não encontrado");
    }

    return await findPedidoById(id);
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function approvePedido(id) {
  try {
    const pedido = await findPedidoById(id);
    if (pedido.status !== "pendente") {
      throw new Error("Apenas pedidos pendentes podem ser aprovados");
    }

    const objectId = new ObjectId(id);
    const result = await getCollection("pedidos").updateOne(
      { _id: objectId },
      { $set: { status: "aprovado" } }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Erro ao aprovar pedido");
    }

    return await findPedidoById(id);
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function sendPedido(id) {
  try {
    const pedido = await findPedidoById(id);
    if (pedido.status !== "aprovado") {
      throw new Error("Apenas pedidos aprovados podem ser enviados");
    }

    const objectId = new ObjectId(id);
    const result = await getCollection("pedidos").updateOne(
      { _id: objectId },
      { $set: { status: "enviado" } }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Erro ao enviar pedido");
    }

    return await findPedidoById(id);
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function deletePedidoById(id) {
  try {
    const objectId = new ObjectId(id);
    const result = await getCollection("pedidos").deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new Error("Pedido não encontrado");
    }
    return true;
  } catch (error) {
    logError(error);
    throw error;
  }
}
