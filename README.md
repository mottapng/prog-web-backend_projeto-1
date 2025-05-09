
# Serviço de Entregas (Node.js e MongoDB) — Projeto 1

**Disciplina:** Programação Web Back-End
**Professores:** Monique Emídio de Oliveira, Willian Massami Watanabe

## 📌 Descrição

Este projeto simula um serviço de entregas, desenvolvido com Node.js puro e MongoDB, sem uso de bibliotecas externas além do driver oficial do Mongo. O objetivo é demonstrar o uso de classes para representar entidades de um banco de dados, com operações básicas (inserção, busca e deleção), validação de campos obrigatórios e tratamento de exceções com geração de logs.

## 🏗️ Estrutura do Projeto

```
/entrega-service
  ├── database/
  │   └── mongo.js           # Conexão com MongoDB
  ├── models/
  │   ├── Cliente.js         # Classe Cliente
  │   ├── Loja.js            # Classe Loja
  │   └── Pedido.js          # Classe Pedido
  ├── utils/
  │   └── logger.js          # Logger de erros
  ├── logs/
  │   └── error.log          # Arquivo de log de erros
  └── index.js               # Script de testes
```

## 📦 Entidades e Atributos

O projeto implementa 3 entidades principais:

### Cliente
- `nome` (obrigatório)
- `email` (obrigatório)
- `endereco` (obrigatório)

### Loja
- `nome` (obrigatório)
- `endereco` (obrigatório)
- `produtos` (array de strings ou objetos simples)

### Pedido
- `cliente_id` (referência ao cliente)
- `loja_id` (referência à loja)
- `produtos` (array)
- `status` (pendente, aprovado, enviado)
- `dataHora` (timestamp ISO)

## ✅ Funcionalidades Implementadas

- Criação de registros no banco
- Busca por ID
- Remoção por ID
- Aceite/envio de pedidos (atualização do status)
- Validação de campos obrigatórios
- Tratamento de exceções com try/catch
- Registro de erros em `logs/error.log`

## 💾 Requisitos

- Node.js instalado
- MongoDB local ou em nuvem (URI de conexão deve ser configurada em `database/mongo.js`)

## 🚀 Como Executar

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/entrega-service.git
cd entrega-service
```

Instale a dependência do MongoDB:

```bash
npm install
```

Configure a URI de conexão no arquivo:  
`./database/mongo.js`

Execute o arquivo de testes:

```bash
node index.js
```

O console mostrará os resultados das operações e, em caso de erros, eles serão registrados em `logs/error.log`.

## 🧪 Teste

O arquivo `index.js` contém um teste simulando:

- Criação de clientes, lojas e pedidos
- Atualização dos pedidos para aprovado/enviado
- Tentativa de criar registros com campos faltantes (para gerar erros)

## 📁 Observações Finais

- O projeto foi desenvolvido sem frameworks ou bibliotecas adicionais.
- Toda a lógica de persistência foi feita manualmente com o driver nativo do MongoDB.
- Os logs são armazenados no arquivo `logs/error.log` de forma simples e direta.
- Desenvolvido como parte do Projeto 1 da disciplina Programação Web Back-End.

**Aluno:** Victor Motta de Oliveira
