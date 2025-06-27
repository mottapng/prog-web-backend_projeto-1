# Documentação da API — Serviço de Entregas

## Sumário
- [Autenticação](#autenticação)
- [Clientes](#clientes)
- [Lojas](#lojas)
- [Pedidos](#pedidos)
- [Utilitários](#utilitários)
- [Fluxo de Pedidos](#fluxo-de-pedidos)
- [Tratamento de Erros](#tratamento-de-erros)
- [Exemplos de Uso](#exemplos-de-uso)

---

## Autenticação

A autenticação é feita por sessão, persistida via cookie. Para acessar rotas protegidas, faça login (usuário estático: "admin@example.com" senha: "1234"):

### Login
- **POST** `/api/auth/login`
  - **Body:**
    ```json
    {
      "usuario": "admin@example.com",
      "senha": "1234"
    }
    ```
  - **Resposta:**
    - 200 OK: `{ "message": "Login bem-sucedido" }`
    - 401 Unauthorized: `{ "message": "Credenciais Inválidas" }`
  - **Observação:** O cookie de sessão é salvo automaticamente nos cookies para as requisições futuras.

---

## Clientes

- **POST** `/api/clientes` — Criar cliente
  - **Body:**
    ```json
    {
      "nome": "João Silva",
      "email": "joao@email.com",
      "endereco": "Rua A, 123"
    }
    ```
  - **Resposta:** 201 Created, retorna o cliente criado.

- **GET** `/api/clientes/:id` — Buscar cliente por ID
  - **Resposta:** 200 OK, retorna o cliente.

- **PUT** `/api/clientes/:id` — Atualizar cliente
  - **Body:** (campos a atualizar)
  - **Resposta:** 200 OK, retorna o cliente atualizado.

- **DELETE** `/api/clientes/:id` — Deletar cliente
  - **Resposta:** 200 OK, mensagem de sucesso.

---

## Lojas

- **POST** `/api/lojas` — Criar loja
  - **Body:**
    ```json
    {
      "nome": "Restaurante Saboroso",
      "endereco": "Av. B, 456",
      "produtos": [
        { "nome": "X-Burger", "preco": 25.9 },
        { "nome": "Batata Frita", "preco": 15.9 }
      ]
    }
    ```
  - **Resposta:** 201 Created, retorna a loja criada.

- **GET** `/api/lojas/:id` — Buscar loja por ID
  - **Resposta:** 200 OK, retorna a loja.

- **PUT** `/api/lojas/:id` — Atualizar loja
  - **Body:** (campos a atualizar)
  - **Resposta:** 200 OK, retorna a loja atualizada.

- **DELETE** `/api/lojas/:id` — Deletar loja
  - **Resposta:** 200 OK, mensagem de sucesso.

---

## Pedidos

- **POST** `/api/pedidos` — Criar pedido
  - **Body:**
    ```json
    {
      "cliente_id": "ID_DO_CLIENTE",
      "loja_id": "ID_DA_LOJA",
      "produtos": [
        { "nome": "X-Burger", "preco": 25.9 },
        { "nome": "Batata Frita", "preco": 15.9 }
      ]
    }
    ```
  - **Resposta:** 201 Created, retorna o pedido criado (status: "pendente").

- **GET** `/api/pedidos/:id` — Buscar pedido por ID
  - **Resposta:** 200 OK, retorna o pedido.

- **PUT** `/api/pedidos/:id` — Atualizar pedido
  - **Body:** (campos a atualizar, ex: produtos)
  - **Resposta:** 200 OK, retorna o pedido atualizado.

- **PUT** `/api/pedidos/:id/aprovar` — Aprovar pedido
  - **Resposta:** 200 OK, status do pedido muda para "aprovado".

- **PUT** `/api/pedidos/:id/enviar` — Enviar pedido
  - **Resposta:** 200 OK, status do pedido muda para "enviado".

- **DELETE** `/api/pedidos/:id` — Deletar pedido
  - **Resposta:** 200 OK, mensagem de sucesso.

---

## Utilitários

- **GET** `/` — Informações da API
  - **Resposta:** 200 OK, informações básicas e rotas disponíveis.

---

## Fluxo de Pedidos

1. **Criar Cliente** — POST `/api/clientes`
2. **Criar Loja** — POST `/api/lojas`
3. **Criar Pedido** — POST `/api/pedidos` (status inicial: "pendente")
4. **Aprovar Pedido** — PUT `/api/pedidos/:id/aprovar` (status: "aprovado")
5. **Enviar Pedido** — PUT `/api/pedidos/:id/enviar` (status: "enviado")

---

## Tratamento de Erros

A API retorna os seguintes códigos HTTP:
- `200` — Sucesso
- `201` — Criado com sucesso
- `400` — Requisição inválida (ex: dados obrigatórios ausentes)
- `401` — Não autorizado (ex: sessão inválida)
- `404` — Recurso não encontrado
- `500` — Erro interno do servidor

**Exemplo de erro:**
```json
{
  "message": "Mensagem de erro detalhada"
}
```

---

## Exemplos de Uso (cURL)

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "usuario": "admin@example.com", "senha": "1234" }'
```

### Criar Cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{ "nome": "João Silva", "email": "joao@email.com", "endereco": "Rua A, 123" }'
```

### Criar Loja
```bash
curl -X POST http://localhost:3000/api/lojas \
  -H "Content-Type: application/json" \
  -d '{ "nome": "Restaurante Saboroso", "endereco": "Av. B, 456", "produtos": [{"nome": "X-Burger", "preco": 25.9}] }'
```

### Criar Pedido
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{ "cliente_id": "ID_DO_CLIENTE", "loja_id": "ID_DA_LOJA", "produtos": [{"nome": "X-Burger", "preco": 25.9}] }'
```

### Aprovar Pedido
```bash
curl -X PUT http://localhost:3000/api/pedidos/ID_DO_PEDIDO/aprovar
```

### Enviar Pedido
```bash
curl -X PUT http://localhost:3000/api/pedidos/ID_DO_PEDIDO/enviar
```

---