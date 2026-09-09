# OnStage Backend

## Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Estrutura

```
backend/
├── prisma/
│   └── schema.prisma      # Modelo do banco de dados
├── src/
│   ├── server.js          # Entry point
│   ├── config/
│   │   └── index.js       # Variáveis de ambiente
│   ├── middleware/
│   │   ├── auth.js        # JWT verification
│   │   ├── rateLimit.js   # Rate limiting
│   │   └── validate.js    # Validação com Zod
│   ├── routes/
│   │   ├── auth.js        # Login, registro, refresh
│   │   ├── users.js       # CRUD usuários
│   │   ├── pages.js       # Páginas (banda, estúdio, bar)
│   │   ├── bookings.js    # Agendamentos
│   │   ├── chat.js        # Mensagens
│   │   ├── credits.js     # Sistema de créditos
│   │   └── social.js      # Feed, likes, comentários
│   ├── controllers/
│   ├── services/
│   └── utils/
├── .env.example
├── .gitignore
└── package.json
```

## Segurança

- JWT com access token (15min) + refresh token (7d)
- bcrypt para hash de senhas
- Rate limiting (100 req/min por IP)
- Helmet para headers de segurança
- Validação de input com Zod
- CORS configurado
