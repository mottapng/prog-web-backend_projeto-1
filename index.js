import { connect, closeConnection } from "./database/mongo.js";
import { Cliente } from "./models/Cliente.js";
import { Loja } from "./models/Loja.js";
import { Pedido } from "./models/Pedido.js";

async function main() {
  try {
    // Conectar ao MongoDB
    await connect();

    // Instanciar as classes
    const clienteModel = new Cliente();
    const lojaModel = new Loja();
    const pedidoModel = new Pedido();

    // Criar uma loja
    console.log("\nCriando loja...");
    const loja = await lojaModel.create({
      nome: "Restaurante Saboroso",
      endereco: "Av. B, 456",
      produtos: [
        { nome: "X-Burger", preco: 25.9 },
        { nome: "Batata Frita", preco: 15.9 },
      ],
    });
    console.log("Loja criada:", loja);

    // Criar um cliente
    console.log("\nCriando cliente...");
    const cliente = await clienteModel.create({
      nome: "João Silva",
      email: "joao@email.com",
      endereco: "Rua A, 123",
    });
    console.log("Cliente criado:", cliente);

    // Cliente cria um pedido
    console.log("\nCriando pedido...");
    const pedido = await pedidoModel.create({
      cliente_id: cliente.id,
      loja_id: loja.id,
      produtos: [
        { nome: "X-Burger", preco: 25.9 },
        { nome: "Batata Frita", preco: 15.9 },
      ],
    });
    console.log("Pedido criado:", pedido);

    // Loja aprova o pedido
    console.log("\nLoja aprovando pedido...");
    const approvedOrder = await pedidoModel.approveOrder(pedido.id);
    console.log("Pedido aprovado:", approvedOrder);

    // Loja envia o pedido
    console.log("\nLoja enviando pedido...");
    const sentOrder = await pedidoModel.sendOrder(pedido.id);
    console.log("Pedido enviado:", sentOrder);

    // Criação de um novo loja com dados inválidos
    console.log("\nCriando loja com dados inválidos...");
    await lojaModel.create({
      nome: "",
      endereco: "Av. B, 456",
    });
  } catch (error) {
    console.error("Erro durante a execução:", error);
  } finally {
    // Fechar conexão com o MongoDB
    await closeConnection();
  }
}

main();
