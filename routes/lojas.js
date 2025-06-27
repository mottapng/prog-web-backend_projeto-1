import express from 'express';
import { createLoja, deleteLojaById, findLojaById, updateLojaById } from '../services/loja.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const loja = await createLoja(req.body);
    res.status(201).json({ 
      data: loja 
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const loja = await findLojaById(req.params.id);
    res.json({ 
      data: loja 
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const loja = await updateLojaById(req.params.id, req.body);
    res.json({ 
      data: loja,
      message: 'Loja atualizado com sucesso' 
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteLojaById(req.params.id);
    res.json({ 
      message: 'Loja deletada com sucesso' 
    });
  } catch (error) {
    next(error);
  }
});

export default router; 