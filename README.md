# ONSTAGE

> Plataforma que conecta músicos, bandas, contratantes, estúdios e público.
> Onde a música encontra seu público.

---

## Estrutura do Projeto

```
onstage/
├── backend/          # API Node.js + Express + Prisma + PostgreSQL
├── mobile/           # App React Native (Expo) — iOS, Android, Web
├── design/           # Wireframes e protótipos
├── docs/             # Documentação de funcionalidades
├── negocio.md        # Documento de negócio
└── README.md         # Este arquivo
```

## Stack Técnica

### Frontend (Mobile + Web)
- **React Native (Expo)** — Um código, 3 plataformas
- **Expo Router** — Navegação file-based
- **Zustand** — Gerenciamento de estado
- **NativeWind (Tailwind)** — Estilização

### Backend
- **Node.js + Express** — API REST
- **Prisma** — ORM type-safe
- **PostgreSQL** — Banco de dados
- **JWT + bcrypt** — Autenticação segura
- **Zod** — Validação de input
- **Socket.io** — Chat em tempo real

## Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configure DATABASE_URL
npx prisma migrate dev
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## Design System

### Cores
- Roxo: `#533afd` (primária)
- Amarelo: `#fbbf24` (secundária)
- Suporte: cinzas, verde, vermelho

### Tipografia
- Inter (sans-serif)

## Segurança
- JWT com access token (15min) + refresh token (7d)
- bcrypt para hash de senhas
- Rate limiting (100 req/min)
- Helmet headers
- Validação Zod
- LGPD compliant

## Contribuição

1. Crie uma branch: `git checkout -b feat/nome-da-feature`
2. Faça commits atômicos
3. Abra um Pull Request para `main`

## Licença

Proprietário — Todos os direitos reservados.
