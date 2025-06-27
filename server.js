import express from 'express';
import { connect } from "./database/mongo.js";
import { authRoutes, clientesRoutes, lojasRoutes, pedidosRoutes } from "./routes/index.js";
import { sessionMiddleware } from './middlewares/session.js';
import { requireLogin } from './middlewares/auth.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Handler de erros
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: err.message || 'Erro interno do servidor' 
  });
};

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'API de Serviço de Entrega',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      lojas: '/api/lojas',
      pedidos: '/api/pedidos'
    }
  });
});

// Rotas de autenticação
app.use('/api/auth', authRoutes);

app.use(sessionMiddleware);

// Rotas protegidas
app.use('/api/clientes', requireLogin, clientesRoutes);
app.use('/api/lojas', requireLogin, lojasRoutes);
app.use('/api/pedidos', requireLogin, pedidosRoutes);

app.use(errorHandler);

// Rota para 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Rota não encontrada' 
  });
});

// Inicializar servidor
async function startServer() {
  try {
    // Conectar ao MongoDB
    await connect();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`API disponível em: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();
