# OnStage Mobile

## Setup

```bash
cd mobile
npm install
npx expo start
```

## Estrutura

```
mobile/
├── app/                      # Expo Router (file-based routing)
│   ├── _layout.js           # Root layout (auth check)
│   ├── index.js             # Redirect to feed or login
│   ├── (auth)/
│   │   ├── login.js
│   │   └── register.js
│   ├── (app)/
│   │   ├── _layout.js       # Tab layout
│   │   ├── feed.js          # Feed social
│   │   ├── explore.js       # Busca e descoberta
│   │   ├── chat.js          # Mensagens
│   │   ├── profile.js       # Perfil do usuário
│   │   └── calendar.js      # Agenda
│   ├── page/
│   │   └── [slug].js        # Página pública (banda, estúdio, etc)
│   └── booking/
│       └── [id].js          # Contratação
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Avatar.js
│   │   ├── Chip.js
│   │   ├── CreditBar.js
│   │   └── TabBar.js
│   ├── theme/
│   │   ├── colors.js        # Paleta OnStage (#533afd, #fbbf24)
│   │   ├── typography.js
│   │   └── spacing.js
│   ├── store/
│   │   ├── authStore.js     # Zustand store
│   │   └── userStore.js
│   ├── services/
│   │   ├── api.js           # Axios config
│   │   ├── auth.js
│   │   ├── pages.js
│   │   ├── bookings.js
│   │   └── chat.js
│   └── utils/
│       ├── format.js
│       └── validation.js
├── assets/
│   ├── fonts/
│   └── images/
├── app.json
├── tailwind.config.js
└── babel.config.js
```

## Design System

### Cores
- Roxo: #533afd (primária)
- Amarelo: #fbbf24 (secundária)
- Branco: #ffffff
- Cinzas: 50-900
- Verde: #10b981 (sucesso)
- Vermelho: #ef4444 (erro)

### Tipografia
- Inter (sans-serif)
- Pesos: 400, 500, 600, 700, 800

## Telas (MVP)

1. **Login/Registro** — Auth com e-mail/senha ou OAuth
2. **Feed** — Publicações de plugados
3. **Explorar** — Busca com filtros (gênero, preço, local, rating)
4. **Perfil** — Perfil universal + páginas vinculadas
5. **Chat** — Conversas em tempo real
6. **Agenda** — Shows e ensaios
7. **Página pública** — Banda, estúdio, venue
8. **Contratação** — Flow de contratar banda
