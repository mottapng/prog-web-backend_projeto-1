import express from 'express';
import { login } from '../services/auth.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const sessionId = await login(req.body);
    
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    res.status(200).json({ 
      message: 'Login bem-sucedido'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
