# ONSTAGE — Documento de Funcionalidades

> Versão 1.0 — 09/09/2026
> Autor: Felipe Masuda
> Status: Em construção

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 O que é o OnStage

O OnStage é uma plataforma digital (web + mobile) que conecta músicos, bandas, contratantes, estúdios e público em um ecossistema único. Funciona como:

- **Marketplace bilateral**: músicos oferecem shows, contratantes buscam e contratam
- **Rede social musical**: feed, likes, comentários, descoberta por geolocalização
- **Rede física de entretenimento**: estúdios com palco externo e bar, onde o público descobre novos músicos

### 1.2 Modelo de Negócio

| Camada | Fonte de Receita | Descrição |
|--------|------------------|-----------|
| **App (digital)** | Créditos PLG + comissão | Compra de créditos, destaque de perfis, comissão sobre contratos |
| **Rede física** | Couvert + consumo | Músico paga couvert simbólico, público consome no bar |
| **Rede (B2B)** | Adesão + % agendamento | Estúdios pagam mensalidade + % sobre reservas |
| **Futuro** | Franquia + eventos | Licenciamento da marca, eventos competitivos |

### 1.3 Estrutura Hierárquica

```
┌─────────────────────────────────────────────┐
│              ONSTAGE GLOBAL                 │
│    (Regras, marca, plataforma, app)         │
├─────────────────────────────────────────────┤
│            REDE NACIONAL                    │
│    (Festival anual, ranking nacional)       │
├─────────────────────────────────────────────┤
│         REDE REGIONAL (ex: Sudeste)         │
│    (Eventos trimestrais, ranking regional)  │
├─────────────────────────────────────────────┤
│         REDE ESTADUAL (ex: SP)              │
│    (Eventos mensais, ranking estadual)      │
├─────────────────────────────────────────────┤
│         REDE LOCAL (ex: Itapetininga)       │
│    (Eventos semanais, showcases no palco)   │
└─────────────────────────────────────────────┘
```

---

## 2. PERFIL UNIVERSAL

### 2.1 Conceito

- **Login único**: uma conta serve para todas as funções
- **Múltiplas páginas**: usuário cria páginas vinculadas ao perfil (banda, estúdio, bar, evento)
- **Todo mundo é plugado**: não há separação rígida de personas

### 2.2 Fluxo de Cadastro

1. Cadastro básico (e-mail/telefone + senha, ou OAuth Google/Apple)
2. Escolha inicial: "Sou músico" / "Sou contratante" / "Sou estúdio" / "Só explorar"
3. Onboarding guiado conforme escolha
4. Possibilidade de adicionar mais páginas depois

### 2.3 Tipos de Página

| Tipo | Descrição | Funcionalidades Específicas |
|------|-----------|----------------------------|
| **Banda** | Perfil musical coletivo | Integração Spotify, repertório, agenda, vagas para substitutos |
| **Músico** | Perfil individual | Currículo musical, disponibilidade, gêneros, portfolio |
| **Contratante** | Quem busca músicos | Histórico de eventos, vagas abertas, avaliações |
| **Estúdio** | Espaço de ensaio | Salas, equipamentos, preços, calendário, palco externo |
| **Bar/Venue** | Local de eventos | Programação, capacidade, fotos, localização |
| **Evento** | Show ou festival | Lineup, couvert, votação |

### 2.4 Privacidade e Permissões

- Dono da página controla quem edita
- Membros de banda podem ser adicionados como co-admins
- Perfil pessoal separado das páginas profissionais

---

## 3. FUNCIONALIDADES DO APP (MARKETPLACE)

### 3.1 Autenticação e Segurança

- [ ] Login por e-mail/senha (hash bcrypt)
- [ ] OAuth (Google, Apple)
- [ ] JWT tokens com refresh
- [ ] Verificação de e-mail/telefone
- [ ] 2FA opcional (TOTP)
- [ ] Rate limiting e proteção contra brute force
- [ ] LGPD compliant (consentimento, exclusão de dados)

### 3.2 Perfis e Integrações

- [ ] Perfil musical completo (bio, gênero, localização, fotos, vídeos)
- [ ] Conexão Spotify (repertório, popularidade, links)
- [ ] Conexão Instagram (métricas de alcance)
- [ ] Upload de mídia (fotos, vídeos, áudios)
- [ ] Link personalizado (onstage.com/banda-aurora)

### 3.3 Busca e Descoberta

- [ ] Busca por texto livre
- [ ] Filtros: gênero, preço, localização, rating, disponibilidade
- [ ] Mapa com músicos próximos (geolocalização)
- [ ] Recomendações personalizadas
- [ ] Destaques e perfis patrocinados

### 3.4 Sistema de Créditos

- [ ] Pacote inicial gratuito (50 créditos)
- [ ] Compra de créditos (PIX, cartão, boleto)
- [ ] Ações que consomem créditos:
  - Postar vaga de show: 10 créditos
  - Destaque na busca (1 dia): 25 créditos
  - Contratar banda (taxa plataforma): 15 créditos
- [ ] Pacotes:
  - 100 créditos: R$ 15
  - 500 créditos: R$ 65 (13% desc)
  - 1000 créditos: R$ 110 (15% desc)

### 3.5 Chat e Contratação

- [ ] Chat em tempo real (contratante ↔ banda)
- [ ] Envio de propostas formais
- [ ] Aceitar/recusar proposta
- [ ] Geração de contrato simples
- [ ] Pagamento integrado (fase 2)

### 3.6 Agendamento

- [ ] Calendário de shows (banda)
- [ ] Calendário de eventos (contratante)
- [ ] Reserva de sala (estúdio)
- [ ] Confirmação e lembretes
- [ ] Sincronização com Google Calendar

### 3.7 Avaliação e Reputação

- [ ] Avaliação bilateral pós-evento (1-5 estrelas)
- [ ] Comentário textual
- [ ] Rating acumulado no perfil
- [ ] Badges de qualidade ("5 estrelas", "10 shows", "pontual")

### 3.8 Feed Social

- [ ] Publicações (vídeo, foto, texto)
- [ ] Likes, comentários, compartilhamentos
- [ ] Descobrir por localização
- [ ] Notificações de shows na região
- [ ] Grupos por cidade/gênero

### 3.9 Gamificação

- [ ] Badges:
  - "Primeiro Show" — completou primeiro evento
  - "5 Estrelas" — rating máximo
  - "100 Likes" — alcance social
  - "Plugado" — 30 dias consecutivos no app
  - "OnStage Verified" — perfil verificado
- [ ] Níveis: Bronze → Prata → Ouro → Diamante
- [ ] Programa de indicação: créditos por amigo convidado

### 3.10 Notificações

- [ ] Push notifications (mobile)
- [ ] Notificações in-app
- [ ] E-mail (resumo semanal)
- [ ] Preferências configuráveis por tipo

---

## 4. FUNCIONALIDADES DA REDE FÍSICA

### 4.1 Estúdio (Aquário)

**Conceito**: sala de ensaio com transparência (vidro/parede visual) para que o público externo veja os músicos ensaiando.

- [ ] Agendamento online de salas
- [ ] Visualização em tempo real (câmera ou vidro)
- [ ] Capacidade e equipamentos listados
- [ ] Preço por hora com desconto para plugados
- [ ] Check-in via app (presença = desconto no bar)

### 4.2 Palco Externo

**Conceito**: área ao ar livre com palco e mesas, onde músicos selecionados ("Produções OnStage") se apresentam.

- [ ] Programação semanal por gênero
  - Segunda: Rock/Indie
  - Terça: MPB/Samba
  - Quarta: Pop/Eletrônica
  - Quinta: Rap/Hip-Hop
  - Sexta: Autoral/Experimental
  - Sábado: Festival (mix)
  - Domingo: Acústico/Jazz
- [ ] Seleção de produções (curadoria OnStage)
- [ ] Couvert artístico (taxa simbólica por músico)
- [ ] Votação do público ao vivo (app)

### 4.3 Bar

- [ ] Check-in no app = desconto no balcão (10-15%)
- [ ] Cardápio digital
- [ ] Histórico de consumo
- [ ] Programa de fidelidade (10 visitas = 1 drink grátis)

### 4.4 Fluxo Estúdio → Palco → Bar

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐      │
│   │  ESTÚDIO │────▶│  PALCO   │────▶│   BAR    │      │
│   │ (aquário)│     │(externo) │     │(público) │      │
│   └──────────┘     └──────────┘     └──────────┘      │
│        │                │                │              │
│    • Ensaio         • Show          • Consumo         │
│    • Seleção        • Descoberta    • Fidelização     │
│    • Gravação       • Competição    • Social          │
│    • Transparência  • Votação       • Check-in        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 5. EVENTOS COMPETITIVOS (BOTTOM-UP)

### 5.1 Formato

- **Semanais**: showcases locais em cada estúdio da rede
- **Mensais**: evento estadual (vencedores locais)
- **Trimestrais**: evento regional
- **Anual**: festival nacional

### 5.2 Mecânica

1. Estúdio local organiza showcase semanal
2. Músicos se inscrevem via app
3. Apresentação no palco externo
4. Votação do público (app) + avaliação do júri (estúdio)
5. Vencedor avança pra fase seguinte
6. Ranking acumulativo por fase

### 5.3 Premiação

- Créditos OnStage
- Destaque no app
- Gravação de EP (estúdio patrocinador)
- Show pago em evento maior

---

## 6. ROADMAP DE CRESCIMENTO

### 6.1 Fase 1 — App no Ar (AGORA)

- [ ] Lançamento do marketplace em Itapetininga
- [ ] Cadastro de músicos e contratantes locais
- [ ] Primeiros shows contratados pelo app
- [ ] Validação de demanda

### 6.2 Fase 2 — Validação (3 meses)

- [ ] Métricas: 100+ plugados, 10+ shows/mês
- [ ] Feedback dos usuários
- [ ] Iteração no produto

### 6.3 Fase 3 — Estúdio Parceiro (6 meses)

- [ ] 1 estúdio existente adere à rede
- [ ] Testar agendamento + palco externo
- [ ] Primeiros showcases com couvert

### 6.4 Fase 4 — Estúdio Próprio (12-18 meses)

- [ ] Primeiro estúdio OnStage (modelo aquário)
- [ ] Estrutura completa: estúdio → palco → bar
- [ ] Competições semanais estabelecidas

### 6.5 Fase 5 — Rede Local (18-24 meses)

- [ ] 2-3 estúdios em Itapetininga
- [ ] Rotação de gêneros consolidada
- [ ] Ranking local ativo

### 6.6 Fase 6 — Expansão (24+ meses)

- [ ] Itapetininga → Sorocaba → Tatuí → Sorocaba Valley
- [ ] Rede estadual (SP)
- [ ] Rede regional (Sudeste)
- [ ] Rede nacional

---

## 7. MÉTRICAS DE SUCESSO (KPIs)

### 7.1 App

| Métrica | Meta 3m | Meta 6m | Meta 12m |
|---------|---------|---------|----------|
| Plugados cadastrados | 100 | 300 | 1.000 |
| Shows contratados/mês | 10 | 30 | 80 |
| NPS | >40 | >50 | >60 |
| Retenção mensal | >40% | >50% | >60% |

### 7.2 Rede Física

| Métrica | Meta |
|---------|------|
| Estúdios parceiros | 1-3 |
| Shows no palco/mês | 4-12 |
| Público médio por show | 20-50 |
| Couvert médio/mês | R$ 400-1.200 |

### 7.3 Competição

| Métrica | Meta |
|---------|------|
| Inscritos por showcase | 5-15 |
| Votação média | 50-200 votos |
| Vencedores avançando | 1/semana |

---

## 8. STACK TÉCNICA (Proposta)

### 8.1 Frontend

| Camada | Tecnologia | Motivo |
|--------|------------|--------|
| **Mobile + Web** | React Native (Expo) | Um código, 3 plataformas |
| **UI Components** | NativeBase ou Tamagui | Profissional, customizável |
| **Estado** | Zustand | Simples, performático |
| **Navegação** | Expo Router | File-based, simples |

### 8.2 Backend

| Camada | Tecnologia | Motivo |
|--------|------------|--------|
| **API** | Node.js + Express | Ecossistema maduro |
| **Auth** | JWT + bcrypt | Segurança |
| **DB** | PostgreSQL | Relacional, robusto |
| **ORM** | Prisma | Type-safe, produtivo |
| **Cache** | Redis | Sessões, rate limit |
| **Storage** | AWS S3 / Cloudflare R2 | Mídia |
| **Realtime** | Socket.io | Chat, notificações |

### 8.3 Infraestrutura

| Camada | Tecnologia | Motivo |
|--------|------------|--------|
| **Cloud** | Railway ou Render | Simples, bom custo |
| **CI/CD** | GitHub Actions | Automação |
| **Monitoramento** | Sentry | Errors tracking |
| **Analytics** | PostHog | Privacy-first |

---

## 9. SEGURANÇA

### 9.1 Autenticação

- JWT com access token (15min) + refresh token (7d)
- Hash bcrypt para senhas
- OAuth 2.0 (Google, Apple)
- 2FA opcional (TOTP)

### 9.2 Proteção de Dados

- HTTPS obrigatório
- Rate limiting (100 req/min por IP)
- Validação de input (Zod)
- Sanitização de dados
- LGPD compliant

### 9.3 Infraestrutura

- Variáveis de ambiente (.env)
- Secrets no GitHub
- Backups automáticos do DB
- Logs de auditoria

---

## 10. PRÓXIMOS PASSOS IMEDIATOS

1. [ ] Definir stack final e criar repositório
2. [ ] Configurar ambiente de desenvolvimento
3. [ ] Criar design system (componentes base)
4. [ ] Implementar autenticação
5. [ ] Construir telas principais (Feed, Explorar, Perfil, Chat)
6. [ ] Integração Spotify
7. [ ] Testes com usuários de Itapetininga

---

*Documento criado em 09/09/2026 — versão 1.0*
*Próxima revisão: após definição da stack técnica*
