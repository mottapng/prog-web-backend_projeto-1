import express from 'express';
import { approvePedido, createPedido, deletePedidoById, findPedidoById, sendPedido, updatePedidoById } from '../services/pedido.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const pedido = await createPedido(req.body);
    res.status(201).json({ 
      data: pedido 
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pedido = await findPedidoById(req.params.id);
    res.json({ 
      data: pedido 
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const pedido = await updatePedidoById(req.params.id, req.body);
    res.json({ 
      data: pedido,
      message: 'Pedido atualizado com sucesso' 
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/aprovar', async (req, res, next) => {
  try {
    const pedido = await approvePedido(req.params.id);
    res.json({ 
      data: pedido,
      message: 'Pedido aprovado com sucesso'
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/enviar', async (req, res, next) => {
  try {
    const pedido = await sendPedido(req.params.id);
    res.json({ 
      data: pedido,
      message: 'Pedido enviado com sucesso'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deletePedidoById(req.params.id);
    res.json({ 
      message: 'Pedido deletado com sucesso' 
    });
  } catch (error) {
    next(error);
  }
});

export default router; 