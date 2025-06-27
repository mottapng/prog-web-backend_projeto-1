# API de Serviço de Entregas (Node.js, Express e MongoDB) — Projeto 2

**Disciplina:** Programação Web Back-End  
**Professores:** Monique Emídio de Oliveira, Willian Massami Watanabe

## 📌 Descrição

Este projeto é uma API REST para um serviço de entregas, desenvolvida com Node.js, Express e MongoDB. A API permite gerenciar clientes, lojas e pedidos através de endpoints RESTful, com validação de dados, autenticação de usuários por sessões, tratamento de erros e logs detalhados.

## 🆕 Mudanças a partir do projeto 1

- **Modularização:** Separação clara entre regras de negócio (`services/`), rotas (`routes/`), middlewares (`middlewares/`) e utilitários (`utils/`).
- **Middlewares customizados:** Para autenticação, sessões e tratamento de erros.
- **Rotas:** Adicionado rotas RESTful para as regras de negócio com framework Express
- **Autenticação:** Implementada por sessões e persistência por cookies, via rota de login (`/auth/login`).

## 🏗️ Estrutura do Projeto

```
/entrega-service
  ├── database/
  │   └── mongo.js            # Conexão com MongoDB
  ├── services/
  │   ├── auth.js             # Lógica de Autenticação
  │   ├── cliente.js          # Lógica de negócio Cliente
  │   ├── loja.js             # Lógica de negócio Loja
  │   └── pedido.js           # Lógica de negócio Pedido
  ├── routes/
  │   ├── auth.js             # Rotas de autenticação  
  │   ├── clientes.js         # Rotas de clientes
  │   ├── lojas.js            # Rotas de lojas
  │   ├── pedidos.js          # Rotas de pedidos
  │   └── index.js            # Exporta as rotas
  ├── middlewares/
  │   ├── auth.js             # Middleware de autenticação
  │   └── session.js          # Middleware de sessão
  ├── utils/
  │   ├── logger.js           # Logger de erros
  │   ├── constants.js        # Constantes globais (armazena usuários estáticos)
  │   └── sessionStore.js     # Gerenciamento de sessões
  ├── logs/
  │   └── error.log           # Arquivo de log de erros
  ├── server.js               # Servidor Express
  ├── package.json            # Dependências e scripts
  └── README.md               # Este arquivo
```

## 🌐 Endpoints da API

### Clientes
- `POST /api/clientes` - Criar cliente
- `GET /api/clientes/:id` - Buscar cliente por ID
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Deletar cliente

### Lojas
- `POST /api/lojas` - Criar loja
- `GET /api/lojas/:id` - Buscar loja por ID
- `PUT /api/lojas/:id` - Atualizar loja
- `DELETE /api/lojas/:id` - Deletar loja

### Pedidos
- `POST /api/pedidos` - Criar pedido
- `GET /api/pedidos/:id` - Buscar pedido por ID
- `PUT /api/pedidos/:id` - Atualizar pedido
- `PUT /api/pedidos/:id/aprovar` - Aprovar pedido
- `PUT /api/pedidos/:id/enviar` - Enviar pedido
- `DELETE /api/pedidos/:id` - Deletar pedido

### Utilitários
- `GET /api/health` - Health check da API
- `GET /` - Informações da API


## 💾 Requisitos

- Node.js (versão 14 ou superior)
- MongoDB local ou em nuvem
- NPM ou Yarn

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone -b projeto-2 https://github.com/seu-usuario/entrega-service.git
cd entrega-service
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o MongoDB
Edite o arquivo `database/mongo.js` e configure a URI de conexão:
```javascript
const uri = "mongodb://admin:admin@localhost:27017";
const dbName = "entrega-service";
```

### 4. Execute o servidor
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 🧪 Testando a API

Você pode testar a API utilizando ferramentas como Postman, Insomnia ou cURL. Exemplos:

#### Criar um cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "endereco": "Rua A, 123"
  }'
```

#### Criar uma loja
```bash
curl -X POST http://localhost:3000/api/lojas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Restaurante Saboroso",
    "endereco": "Av. B, 456",
    "produtos": [
      {"nome": "X-Burger", "preco": 25.9},
      {"nome": "Batata Frita", "preco": 15.9}
    ]
  }'
```

#### Criar um pedido
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": "ID_DO_CLIENTE",
    "loja_id": "ID_DA_LOJA",
    "produtos": [
      {"nome": "X-Burger", "preco": 25.9},
      {"nome": "Batata Frita", "preco": 15.9}
    ]
  }'
```

#### Aprovar um pedido
```bash
curl -X PUT http://localhost:3000/api/pedidos/ID_DO_PEDIDO/aprovar
```

#### Enviar um pedido
```bash
curl -X PUT http://localhost:3000/api/pedidos/ID_DO_PEDIDO/enviar
```

## 📋 Fluxo de Pedidos

1. **Criar Cliente** - `POST /api/clientes`
2. **Criar Loja** - `POST /api/lojas`
3. **Criar Pedido** - `POST /api/pedidos` (status: "pendente")
4. **Aprovar Pedido** - `PUT /api/pedidos/:id/aprovar` (status: "aprovado")
5. **Enviar Pedido** - `PUT /api/pedidos/:id/enviar` (status: "enviado")

## 🔧 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL

## 📚 Documentação

Para documentação completa da API, consulte o arquivo `API_DOCUMENTATION.md`.

## 🐛 Tratamento de Erros

A API retorna códigos de status HTTP apropriados:
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## 📁 Observações Finais

- O projeto foi desenvolvido sem frameworks ou bibliotecas adicionais.
- Toda a lógica de persistência foi feita manualmente com o driver nativo do MongoDB.
- Os logs são armazenados no arquivo logs/error.log de forma simples e direta.
- Desenvolvido como parte do Projeto 2 da disciplina Programação Web Back-End.

**Aluno:** Victor Motta de Oliveira
