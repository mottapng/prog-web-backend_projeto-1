import express from 'express';
import { createCliente, deleteClienteById, updateClienteById } from '../services/cliente.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const cliente = await createCliente(req.body);
    res.status(201).json({ 
      data: cliente 
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const cliente = await findClienteById(req.params.id);
    res.json({ 
      data: cliente 
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const cliente = await updateClienteById(req.params.id, req.body);
    res.json({ 
      data: cliente,
      message: 'Cliente atualizado com sucesso' 
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteClienteById(req.params.id);
    res.json({ 
      message: 'Cliente deletado com sucesso' 
    });
  } catch (error) {
    next(error);
  }
});

export default router; 