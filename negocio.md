# OnStage — Documento de Negócio

> Rede de entretenimento que conecta músicos, contratantes, estúdios e público.
> Usuários são chamados de **plugados**.

---

## 1. Visão Geral

| Campo | Definição |
|-------|-----------|
| **Nome** | OnStage |
| **Slogan** | Where music finds its audience |
| **Modelo** | Marketplace bilateral (músicos ↔ contratantes) + rede social |
| **Monetização** | Créditos PLG + comissão em contratos |
| **Roadmap** | 1. Branding ✅ → 2. Modelo Financeiro → 3. Marketing → 4. Wireframe → 5. MVP |

---

## 2. Identidade de Marca

| Elemento | Especificação |
|----------|---------------|
| **Cor primária** | Roxo `#533afd` |
| **Cor secundária** | Amarelo `#fbbf24` |
| **Tipografia** | Inter / Poppins |
| **Tom de voz** | Direto, inclusivo, vibrante |
| **Ícone** | Palco com holofotes + pessoas ao redor |
| **Usuários** | "Plugados" — conectados, em cena, no palco |

---

## 3. Personas

### 3.1 Músicos / Bandas
- Postam perfil da banda com integrantes, gênero, horários
- Conectam Spotify (repertório, faixas oficiais, covers)
- Conectam Instagram (demonstrar alcance/público)
- Definem disponibilidade: diurno/noturno, semana/fds
- Precificam o show por categoria
- Deixam vagas abertas para substitutos quando falta integrante
- Agenda de shows/cronograma

### 3.2 Músicos Independentes
- Entram na rede para preencher vagas em bandas
- Disponibilidade por período e gênero
- Montam currículo musical dentro da plataforma

### 3.3 Contratantes
- Bares, restaurantes, casamentos, aniversários, eventos corporativos
- Buscam bandas por: gênero, preço, localização, rating
- Exponham vagas para shows/eventos
- Contratam pela plataforma
- Cronograma de eventos

### 3.4 Estúdios
- Cadastram horários disponíveis para ensaio
- Oferecem descontos para atrair plugados
- Postam fotos/vídeos do espaço
- Agendamento online

### 3.5 Público / Fãs
- Seguem bandas, recebem novidades
- Curtem/compartilham (validação social)
- Descobrem eventos na região

---

## 4. Funcionalidades Planejadas

### Core (MVP)
- [ ] Cadastro de perfis (música, banda, contratante, estúdio)
- [ ] Integração Spotify (repertório, popularidade, links)
- [ ] Integração Instagram (métricas de alcance)
- [ ] Busca e filtros (gênero, preço, localização, rating)
- [ ] Sistema de créditos (postagem, destaque, contratação)
- [ ] Chat entre contratante e banda
- [ ] Agendamento (shows, ensaios)
- [ ] Avaliação pós-evento (rating bilateral)

### Social / Rede
- [ ] Feed de publicações (vídeos, fotos, textos)
- [ ] Likes, comentários, compartilhamentos
- [ ] Descoberta por localização geográfica
- [ ] Notificações de shows na região

### Gestão de Bandas
- [ ] Canal individual por integrante
- [ ] Vaga aberta para substituto (com visibilidade)
- [ ] Especificação de horário (diurno/noturno, semana/fds)
- [ ] Repertório por categoria (covers, autorais, etc.)

### Estúdios
- [ ] Cadastro de salas e equipamentos
- [ ] Preço por hora com desconto para plugados
- [ ] Calendário de disponibilidade
- [ ] Reserva online

### Financeiro (créditos)
- [ ] Pacote inicial gratuito de créditos (X por conta)
- [ ] Compra de créditos adicionais (cartão, PIX)
- [ ] Créditos por: postar vaga, destacar perfil, contratar
- [ ] Saque para músicos (taxa de serviço)

---

## 5. Modelo Financeiro — Esboço

### 5.1 Receitas

| Fonte | Descrição | Exemplo |
|-------|-----------|---------|
| **Venda de créditos** | Plugados compram créditos para postar vagas, destacar perfis | R$ 15-50/pacote |
| **Comissão sobre contrato** | % sobre cada show contratado pela plataforma | 10-15% |
| **Destaque / impulsionamento** | Perfis destacados no feed e busca (tipo "patrocinado") | R$ 5-20/dia |
| **Assinatura estúdio** | SaaS para estúdios (gestão de agenda + visibilidade) | R$ 29-49/mês |

### 5.2 Custos Estimados

| Item | Mensal |
|------|--------|
| Infraestrutura (servidores, DB, CDN) | R$ 500-2.000 |
| Spotify API | Free (até volume alto) |
| Instagram API | Free |
| Processamento de pagamentos | 3-5% por transação |
| Equipe (futuro) | — |
| Marketing inicial | R$ 500-2.000 |

### 5.3 Unit Economics (projeção)

| Métrica | Valor |
|---------|-------|
| Preço médio do show | R$ 800-3.000 |
| Comissão (10%) | R$ 80-300/show |
| Shows/mês (ano 1) | 50-200 |
| Receita mensal (comissão) | R$ 4.000-60.000 |
| Break-even estimado | ~6 meses (com 80 shows/mês) |

### 5.4 Créditos — Proposta Inicial

| Ação | Custo em créditos |
|------|-------------------|
| Postar vaga de show | 10 créditos |
| Destaque na busca (1 dia) | 25 créditos |
| Contratar banda (taxa da plataforma) | 15 créditos ou % direto |
| Cadastro de estúdio (mês grátis) | 0 (ativação) |
| **Pacote 100 créditos** | **R$ 15** |
| **Pacote 500 créditos** | **R$ 65 (13% desc)** |
| **Pacote 1000 créditos** | **R$ 110 (15% desc)** |

---

## 6. Jornada do Usuário

### Músico:
1. Cria conta → conecta Spotify/Instagram → cadastra banda
2. Posta repertório, define disponibilidade, preço
3. Recebe solicitações de shows → aceita/recusa
4. Após show, recebe avaliação
5. Compra créditos para destacar perfil quando necessário

### Contratante:
1. Cria conta → busca bandas por filtros
2. Envia proposta → negocia pelo chat
3. Contrata e paga (plataforma ou externo)
4. Após evento, avalia banda

---

## 7. Análise Competitiva (espaço a preencher)

| Concorrente | O que faz | Diferencial OnStage |
|-------------|-----------|---------------------|
| Palinha Musical (BR) | App de vagas para músicos | + estúdio, + rede social, + contratação direta |
| GigSalad (US) | Contratação de artistas para eventos | Focado em EUA, sem estúdio, sem vagas abertas |
| Bark (UK) | Contratação de serviços (incl. músicos) | Genérico, sem curadoria musical |
| SoundBetter | Contratação de músicos profissionais | Focado em estúdio/gravação, não shows |

---

## 8. Roadmap Detalhado

### Fase 0 — Fundação ✅
- [x] Nome e branding
- [x] Definição de personas
- [x] Esboço de funcionalidades

### Fase 1 — Documentação (ATUAL)
- [ ] Modelo financeiro completo (receita, custos, projeções)
- [ ] Plano de marketing (canais, aquisição, CAC)
- [ ] Canvas de modelo de negócio
- [ ] Análise competitiva aprofundada

### Fase 2 — Design
- [ ] Wireframes (mobile-first)
- [ ] Identidade visual final (logo, ícone, UI kit)
- [ ] Protótipo interativo (Figma)

### Fase 3 — MVP Técnico
- [ ] Backend (API, DB, auth)
- [ ] Integração Spotify
- [ ] Integração Instagram
- [ ] Sistema de créditos/pagamentos
- [ ] Chat básico
- [ ] Agendamento

### Fase 4 — Validação
- [ ] Beta fechado (50-100 músicos, 10-20 contratantes)
- [ ] Métricas de uso
- [ ] Feedback e iteração

### Fase 5 — Lançamento
- [ ] Marketing de lançamento
- [ ] App stores (iOS/Android) ou PWA
- [ ] Expansão geográfica

---

## 9. Métras de Sucesso (KPIs)

| Indicador | Meta Ano 1 |
|-----------|------------|
| Plugados cadastrados | 2.000 |
| Shows contratados/mês | 100 |
| NPS (bandas e contratantes) | >50 |
| Retenção mensal (músicos) | >60% |
| Receita mensal recorrente | R$ 15.000 |
| CAC (custo de aquisição) | <R$ 20 |

---

## 10. Próximos Passos Imediatos

1. **Completar modelo financeiro** — projeção 12 meses, sensibilidade
2. **Plano de marketing** — onde estão os plugados? como alcançar?
3. **Canvas BMC** — Business Model Canvas formal
4. **Wireframes** — telas principais (perfil, busca, chat, agenda)

---

*Documento criado em 03/09/2026 — versão 0.1 (esboço inicial)*
*Última sessão de contexto: 29/08/2026 (Telegram/Argos)*
