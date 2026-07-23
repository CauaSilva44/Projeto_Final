# Biblioteca API

API backend de uma biblioteca usando Express e MongoDB.

## Requisitos

- Node.js 18+ ou compatível
- MongoDB local ou Atlas

## Instalação

1. Abra o terminal em `Biblioteca`
2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com ao menos:

```env
MONGO_URI=mongodb://localhost:27017/biblioteca
JWT_SECRET=seu_segundo_segredo
BCRYPT_SALT_ROUNDS=10
```

## Execução

```bash
npm start
```

Para rodar em desenvolvimento com reinício automático:

```bash
npm run dev
```

## Seed de admin

Para criar um usuário admin inicial:

```bash
npm run seed-admin
```

Variáveis opcionais para seed:

```bash
SEED_ADMIN_EMAIL=admin@biblioteca.com \
SEED_ADMIN_SENHA=admin123 \
SEED_ADMIN_NOME=Administrador \
npm run seed-admin
```

## Rotas principais

- `GET /livros`
- `GET /livros/:id`
- `POST /livros` (admin)
- `PATCH /livros/:id` (admin)
- `DELETE /livros/:id` (admin)
- `POST /auth/cadastrar`
- `POST /auth/login`

### Exemplo de login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@biblioteca.com","senha":"admin123"}'
```

### Exemplo de requisição protegida

```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"titulo":"Livro","autor":"Autor","categoria":"Cat","quantidade":3,"disponivel":3}'
```
