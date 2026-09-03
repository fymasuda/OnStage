"""
Gerador do documento OnStage Resumo Expandido em formato .docx.
Inclui gráficos, tabelas e formatação profissional.
"""
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
import os

ASSETS_DIR = r"E:\OnStage\documento\assets"
OUTPUT = r"E:\OnStage\documento\resumo-expandido\OnStage_Resumo_Expandido.docx"

doc = Document()

# === Page margins ===
for section in doc.sections:
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.0)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.0)

# === Styles ===
style = doc.styles['Normal']
font = style.font
font.name = 'Arial'
font.size = Pt(12)
style.paragraph_format.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE
style.paragraph_format.space_after = Pt(6)

def add_heading(doc, text, level=1):
    h = doc.add_heading(text, level=level)
    for run in h.runs:
        run.font.name = 'Arial'
        run.font.color.rgb = RGBColor(0x53, 0x3A, 0xFD)
    return h

def add_paragraph(doc, text, bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(12)
    run.bold = bold
    run.italic = italic
    return p

def add_title(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(14)
    run.font.all_caps = True
    run.bold = True
    run.font.color.rgb = RGBColor(0x53, 0x3A, 0xFD)
    p.paragraph_format.space_after = Pt(4)
    return p

def add_subtitle(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(12)
    run.font.all_caps = True
    run.font.color.rgb = RGBColor(0x53, 0x3A, 0xFD)
    p.paragraph_format.space_after = Pt(8)
    return p

def add_field(doc, label, value):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run1 = p.add_run(label)
    run1.font.name = 'Arial'
    run1.font.size = Pt(12)
    run2 = p.add_run(value)
    run2.font.name = 'Arial'
    run2.font.size = Pt(12)
    p.paragraph_format.space_after = Pt(2)

def add_image(doc, path, width=5.5):
    if os.path.exists(path):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run()
        run.add_picture(path, width=Inches(width))
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(6)
        return True
    return False

def add_caption(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(10)
    run.italic = True
    run.font.color.rgb = RGBColor(0x66, 0x66, 0x66)
    p.paragraph_format.space_after = Pt(8)
    return p

def add_table(doc, headers, rows):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    # Headers
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = h
        for paragraph in cell.paragraphs:
            paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
            for run in paragraph.runs:
                run.font.name = 'Arial'
                run.font.size = Pt(10)
                run.bold = True
                run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        # Header background
        shading = cell._element.get_or_add_tcPr()
        shading_elem = shading.makeelement(qn('w:shd'), {
            qn('w:fill'): '533AFD',
            qn('w:val'): 'clear'
        })
        shading.append(shading_elem)
    # Rows
    for r_idx, row in enumerate(rows):
        for c_idx, val in enumerate(row):
            cell = table.rows[r_idx + 1].cells[c_idx]
            cell.text = str(val)
            for paragraph in cell.paragraphs:
                paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
                for run in paragraph.runs:
                    run.font.name = 'Arial'
                    run.font.size = Pt(10)
    doc.add_paragraph()  # spacing
    return table

# ============================================================
# CAPA
# ============================================================
doc.add_paragraph()
doc.add_paragraph()
add_title(doc, "ONSTAGE — PLATAFORMA GLOBAL DE CONEXÃO MUSICAL")
add_subtitle(doc, "Plano de Marketing para Internacionalização de um Produto Digital")
doc.add_paragraph()

add_field(doc, "", "")
add_field(doc, "Aluno: ", "Felipe Yoshiyuki Masuda")
add_field(doc, "Instituição: ", "FATEC Itapetininga — SP")
add_field(doc, "E-mail: ", "f_masuda@hotmail.com")
add_field(doc, "", "")
add_field(doc, "Orientador: ", "Prof. Bruno Kortz (a confirmar)")
add_field(doc, "Instituição: ", "FATEC Itapetininga — SP")
add_field(doc, "", "")
add_field(doc, "Co-orientador: ", "Não possui")
doc.add_paragraph()
doc.add_paragraph()

# ============================================================
# RESUMO
# ============================================================
add_heading(doc, "RESUMO", level=1)
add_paragraph(doc,
    "O presente trabalho apresenta o plano de marketing para internacionalização do OnStage, uma plataforma digital "
    "(web e mobile) que conecta músicos autorais e bandas a contratantes de entretenimento (bares, festivais, eventos "
    "corporativos, casamentos e estúdios). O problema central reside na dificuldade que músicos independentes enfrentam "
    "para serem reconhecidos e inseridos no mercado de entretenimento, tanto nacional quanto internacional. A solução "
    "proposta é um marketplace bilateral de base tecnológica que funciona como rede social, vitrine musical e canal de "
    "contratação simultaneamente, com integração a Spotify e Instagram para validação social e alcance global. "
    "O diferencial competitivo reside na combinação de curadoria musical, geolocalização e modelo product-led growth (PLG) "
    "com monetização via créditos e comissões. O mercado global de música ao vivo foi avaliado em USD 38,58 bilhões em 2025 "
    "e cresce a CAGR de 8,78% ao ano. A economia criativa global atingiu USD 252,3 bilhões em 2025 com projeção de "
    "USD 1,35 trilhão até 2033 (CAGR 23,3%). No Brasil, a indústria criativa representa 3,59% do PIB (R$ 393,3 bilhões). "
    "O plano de marketing abrange análise de mercado, posicionamento, estratégia de precificação, canais de aquisição "
    "e fidelização, alinhado ao modelo de negócios Canvas e ao plano financeiro de viabilidade."
)
add_paragraph(doc, "")
add_paragraph(doc, "PALAVRAS-CHAVE: Marketing digital. Comércio exterior. Internacionalização. Marketplace musical. "
    "Economia criativa. Produto digital.", bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.LEFT)

# Page break
doc.add_page_break()

# ============================================================
# 1 INTRODUÇÃO
# ============================================================
add_heading(doc, "1 INTRODUÇÃO", level=1)

add_heading(doc, "1.1 Visão Geral do Empreendimento", level=2)
add_paragraph(doc,
    "O OnStage é uma plataforma digital (web + mobile iOS/Android) concebida para ser uma rede global de conexão musical. "
    "A proposta é dar voz e visibilidade a músicos autorais e bandas que enfrentam dificuldade de inserção no mercado de "
    "entretenimento, colocando-os 'no palco' — conectando-os diretamente a contratantes (bares, festivais, hotéis, eventos, "
    "estúdios) e ao público validador."
)

add_heading(doc, "1.2 Problema", level=2)
add_paragraph(doc,
    "Músicos independentes e autorais representam a maioria da força criativa global, mas enfrentam barreiras estruturais "
    "de visibilidade e acesso ao mercado:"
)
add_paragraph(doc,
    "• Falta de vitrine profissional: artistas emergentes não possuem espaço centralizado para exibir repertório, "
    "alcance de público e credibilidade.\n"
    "• Dificuldade de contratação: contratantes de entretenimento não têm acesso curado a talentos verificados.\n"
    "• Fragmentação de canais: redes sociais são dispersas e não focadas em contratação musical.\n"
    "• Barreira geográfica: músicos brasileiros raramente alcançam mercados internacionais por falta de plataforma bilíngue.\n"
    "• Economia criativa subaproveitada: conforme a UNCTAD (2024), exportações de serviços criativos atingiram USD 1,7 trilhão "
    "em 2024, mas músicos independentes captam fração insignificante."
)

add_heading(doc, "1.3 Solução Proposta", level=2)
add_paragraph(doc,
    "O OnStage propõe um marketplace bilateral com camada social que integra: (1) perfil musical completo com repertório "
    "Spotify e métricas do Instagram; (2) busca inteligente por gênero, preço, localização e rating; (3) sistema de "
    "créditos PLG com entrada gratuita; (4) agendamento integrado; (5) internacionalização nativa com suporte a múltiplos idiomas."
)

add_heading(doc, "1.4 Público-Alvo", level=2)
add_table(doc,
    ["Segmento", "Descrição", "Localização"],
    [
        ["Músicos autorais/bandas", "Artistas independentes que buscam shows e reconhecimento", "BR → LATAM → Global"],
        ["Contratantes de entretenimento", "Bares, festivais, hotéis, eventos, casamentos", "Global"],
        ["Estúdios de ensaio", "Espaços com horários disponíveis para ensaio", "Brasil"],
        ["Músicos substitutos", "Profissionais para vagas temporárias", "Brasil"],
        ["Público/fãs", "Consumidores que validam e descobrem artistas", "Global"],
    ]
)

add_heading(doc, "1.5 Diferencial Competitivo", level=2)
add_paragraph(doc,
    "1) Bilateral + social: único marketplace que combina contratação com validação social.\n"
    "2) Foco em músicos autorais: posicionamento específico para artistas que criam conteúdo próprio.\n"
    "3) Integração Spotify + Instagram: conexão direta com plataformas que músicos já utilizam.\n"
    "4) Internacionalização desde a concepção: plataforma multilíngue pensada para escalar globalmente.\n"
    "5) Modelo PLG com créditos: entrada gratuita, crescimento orgânico, monetização progressiva."
)

add_heading(doc, "1.6 Relevância para Comércio Exterior", level=2)
add_paragraph(doc,
    "O OnStage conecta ao curso de Comércio Exterior por três eixos: (1) exportação de serviços culturais — músicos "
    "'exportam' seu talento para mercados internacionais; (2) importação de demanda — contratantes internacionais "
    "'importam' talentos brasileiros via plataforma; (3) marketing internacional — o plano de marketing foca na expansão "
    "global do produto digital, abordando adaptação cultural, posicionamento multilíngue e canais de aquisição em múltiplos mercados."
)

# ============================================================
# 2 PRODUTO OU SERVIÇO
# ============================================================
doc.add_page_break()
add_heading(doc, "2 PRODUTO OU SERVIÇO", level=1)

add_heading(doc, "2.1 Descrição da Solução", level=2)
add_paragraph(doc,
    "O OnStage é uma plataforma digital acessível via web (PWA) e aplicativos nativos iOS e Android. Funciona como: "
    "(1) marketplace bilateral — músicos oferecem shows, contratantes buscam e contratam; (2) rede social musical — "
    "feed de publicações, likes, comentários; (3) vitrine profissional — perfil com integração Spotify e Instagram; "
    "(4) sistema de agendamento — calendário integrado para shows e reservas de estúdio; (5) gestão de bandas — "
    "canal por integrante, vagas para substitutos."
)

add_heading(doc, "2.2 Benefícios", level=2)
add_table(doc,
    ["Para Músicos", "Para Contratantes", "Para Estúdios"],
    [
        ["Visibilidade global", "Acesso curado a talentos", "Gestão online de agenda"],
        ["Canal de contratação direta", "Busca por filtros inteligentes", "Visibilidade para plugados"],
        ["Validação social", "Avaliação bilateral", "Reserva online"],
        ["Ferramenta de marketing", "Diversidade de gêneros/preços", "Ocupação de horários vagos"],
        ["Portfólio digital", "Chat integrado", "Fidelização via desconto"],
    ]
)

add_heading(doc, "2.3 Inovação", level=2)
add_paragraph(doc,
    "A combinação de marketplace de música ao vivo + rede social + agendamento + gestão de bandas é única no mercado. "
    "A validação cruzada entre Spotify (repertório) e Instagram (alcance) cria perfis confiáveis sem necessidade de "
    "curadoria manual intensiva. O modelo PLG musical com créditos incentiva adoção orgânica e crescimento viral."
)

add_heading(doc, "2.4 Estágio de Desenvolvimento", level=2)
add_paragraph(doc,
    "Atualmente em fase de documentação e planejamento (business plan). Próximos passos: wireframes, protótipo Figma, "
    "MVP técnico com backend, mobile e web."
)

add_heading(doc, "2.5 Roadmap do Produto", level=2)
add_table(doc,
    ["Fase", "Entregas", "Prazo"],
    [
        ["Fase 1 — Documentação", "Business plan, plano de marketing, canvas, wireframes", "Até nov/2026"],
        ["Fase 2 — Protótipo", "Design UI/UX, protótipo interativo Figma", "Dez/2026–Jan/2027"],
        ["Fase 3 — MVP", "Backend (API), mobile (React Native), web (React)", "Fev–Mai/2027"],
        ["Fase 4 — Beta fechado", "100 músicos, 20 contratantes, 5 estúdios (SP)", "Jun–Ago/2027"],
        ["Fase 5 — Lançamento", "App stores, marketing de aquisição, expansão SP", "Set/2027"],
    ]
)

# ============================================================
# 3 ANÁLISE DE MERCADO
# ============================================================
doc.add_page_break()
add_heading(doc, "3 ANÁLISE DE MERCADO", level=1)

add_heading(doc, "3.1 Mercado Global de Música Ao Vivo", level=2)
add_table(doc,
    ["Métrica", "Valor", "Fonte"],
    [
        ["Tamanho do mercado (2025)", "USD 38,58 bilhões", "Custom Market Insights (2026)"],
        ["Projeção (2034)", "USD 71,34 bilhões (CAGR 8,32%)", "Research and Markets (2025)"],
        ["Ticket segment (2024)", "USD 20,04 bilhões", "Technavio (2026)"],
        ["Crescimento CAGR", "11,8% (2025–2030)", "Technavio (2026)"],
        ["EUA (2025)", "USD 18,51 bilhões", "Mordor Intelligence (2025)"],
    ]
)

add_image(doc, os.path.join(ASSETS_DIR, "mercado_musica_ao_vivo.png"), width=5.5)
add_caption(doc, "Figura 1 — Mercado global de música ao vivo: tamanho e projeção. Fonte: elaborado pelo autor com base em dados de "
    "Custom Market Insights (2026) e Research and Markets (2025).")

add_heading(doc, "3.2 Mercado de Gravação / Streaming", level=2)
add_table(doc,
    ["Métrica", "Valor", "Fonte"],
    [
        ["Receita global gravação (2025)", "USD 31,7 bilhões (+6,4%)", "IFPI Global Music Report (2026)"],
        ["Streaming (% do total)", "69,6% (USD 22 bilhões)", "IFPI (2026)"],
        ["Streaming pago (usuários)", "837 milhões de assinaturas", "IFPI (2026)"],
        ["Brasil — posição global", "#8 maior mercado", "IFPI (2026)"],
        ["Brasil — crescimento (2025)", "+14,1%", "IFPI (2026)"],
        ["América Latina — crescimento", "+17,1% (2025)", "IFPI (2026)"],
    ]
)

add_heading(doc, "3.3 Economia Criativa Global", level=2)
add_table(doc,
    ["Métrica", "Valor", "Fonte"],
    [
        ["Creator economy (2025)", "USD 252,3 bilhões", "Grand View Research (2026)"],
        ["Projeção (2033)", "USD 1.345,5 bilhões (CAGR 23,3%)", "Grand View Research (2026)"],
        ["Exportações serviços criativos (2024)", "USD 1,7 trilhão", "UNCTAD Data Hub (2025)"],
        ["Brasil — PIB indústria criativa (2023)", "3,59% = R$ 393,3 bi", "Firjan (2025)"],
        ["Brasil — trabalhadores criativos", "1,262 milhão", "Firjan (2025)"],
    ]
)

add_image(doc, os.path.join(ASSETS_DIR, "creator_economy.png"), width=5.5)
add_caption(doc, "Figura 2 — Creator economy global: crescimento projetado (CAGR 23,3%). Fonte: elaborado pelo autor com base em "
    "dados de Grand View Research (2026).")

add_image(doc, os.path.join(ASSETS_DIR, "economia_criativa_brasil.png"), width=5.0)
add_caption(doc, "Figura 3 — Economia criativa no Brasil: participação no PIB. Fonte: elaborado pelo autor com base em dados da "
    "Firjan — Mapeamento da Indústria Criativa (2025).")

add_heading(doc, "3.4 Personas", level=2)

add_paragraph(doc, "Persona 1 — Músico Autoral", bold=True)
add_paragraph(doc,
    "Lucas, 28 anos. Cantor e compositor, toca violão e voz, tem 20 faixas autorais no Spotify (2.000 seguidores), "
    "Instagram com 3.500 seguidores. Dor: toca em bares locais, mas quer alcançar festivais e cidades maiores. "
    "Não sabe como ser descoberto por contratantes. Objetivo: ser visto, ser contratado, construir carreira."
)

add_paragraph(doc, "Persona 2 — Contratante", bold=True)
add_paragraph(doc,
    "Ana, 35 anos, gerente de eventos. Contrata música ao vivo para festival de 5.000 pessoas. Precisa de 3 bandas "
    "de gêneros diferentes. Dor: não sabe onde encontrar bandas com qualidade comprovada. Instagram é caótico. "
    "Objetivo: encontrar bandas rapidamente, com preço justo e avaliações confiáveis."
)

add_paragraph(doc, "Persona 3 — Estúdio", bold=True)
add_paragraph(doc,
    "Carlos, 42 anos, dono de estúdio. Tem 4 salas, ocupação média de 60%. Dor: dificuldade de preencher horários "
    "vagos. Objetivo: maximizar ocupação, fidelizar músicos com desconto."
)

add_heading(doc, "3.5 Concorrentes", level=2)
add_table(doc,
    ["Plataforma", "Foco", "Pontos Fracos", "Diferencial OnStage"],
    [
        ["GigSalad (US)", "Contratar artistas", "Sem músicos BR", "Foco em músicos autorais + social"],
        ["Palinha Musical (BR)", "Vagas para músicos", "Sem contratação direta", "Marketplace bilateral"],
        ["SoundBetter (US)", "Gravação em estúdio", "Não é shows ao vivo", "Shows + rede social"],
        ["Bark (UK)", "Serviços genéricos", "Sem curadoria musical", "Curadoria + foco exclusivo"],
        ["Fiverr (global)", "Freelancers", "Sem especificidade", "100% música ao vivo"],
    ]
)

add_heading(doc, "3.6 Análise SWOT", level=2)
add_table(doc,
    ["FORÇAS", "FRAQUEZAS"],
    [
        ["Marketplace bilateral diferenciado", "Marca desconhecida (pré-lançamento)"],
        ["Integração Spotify + Instagram", "Dependência de APIs terceiras"],
        ["Modelo PLG com créditos", "Necessidade de escala para liquidez"],
        ["Viés internacionalização nativa", "Equipe reduzida (solo founder)"],
        ["Foco em músicos autorais", "Recursos financeiros limitados"],
    ]
)
add_paragraph(doc, "")
add_table(doc,
    ["OPORTUNIDADES", "AMEAÇAS"],
    [
        ["Economia criativa (CAGR 23,3%)", "Entrada de players grandes"],
        ["Música ao vivo em expansão", "Mudanças nas APIs Spotify/Instagram"],
        ["Brasil é #8 mercado de música", "Competição por atenção"],
        ["Tendência creator economy", "Regulamentação trabalhista"],
        ["Exportação serviços digitais em alta", "Instabilidade econômica"],
    ]
)

# ============================================================
# 4 MODELO DE NEGÓCIOS
# ============================================================
doc.add_page_break()
add_heading(doc, "4 MODELO DE NEGÓCIOS (Business Model Canvas)", level=1)

add_heading(doc, "4.1 Proposta de Valor", level=2)
add_paragraph(doc,
    "Dar voz e visibilidade a músicos autorais, conectando-os diretamente a contratantes de entretenimento em escala global, "
    "por meio de uma plataforma digital integrada (vitrine + marketplace + rede social)."
)

add_heading(doc, "4.2 Segmentos de Clientes", level=2)
add_paragraph(doc,
    "Músicos autorais e bandas (oferta); Contratantes de entretenimento (demanda); Estúdios de ensaio (infraestrutura)."
)

add_heading(doc, "4.3 Canais", level=2)
add_paragraph(doc,
    "App stores (Google Play, Apple App Store); Web (PWA); Redes sociais (Instagram, TikTok, YouTube); SEO; "
    "Parcerias com escolas de música, estúdios e eventos."
)

add_heading(doc, "4.4 Relacionamento com Clientes", level=2)
add_paragraph(doc,
    "Auto-serviço (onboarding guiado); Comunidade (feed social, grupos por cidade); Suporte (chat, FAQ); "
    "Fidelidade (créditos por indicação, descontos progressivos)."
)

add_heading(doc, "4.5 Fontes de Receita", level=2)
add_table(doc,
    ["Fonte", "Descrição", "Preço"],
    [
        ["Venda de créditos", "Pacotes para postar vagas e destacar perfis", "R$ 15–110"],
        ["Comissão sobre contrato", "10–15% sobre cada show contratado", "Variável"],
        ["Destaque/impulsionamento", "Perfil em destaque na busca e feed", "R$ 5–20/dia"],
        ["Assinatura estúdio", "SaaS para gestão + visibilidade", "R$ 29–49/mês"],
    ]
)

add_image(doc, os.path.join(ASSETS_DIR, "composicao_receita.png"), width=4.5)
add_caption(doc, "Figura 4 — Composição estimada de receita no Ano 1. Fonte: elaborado pelo autor.")

add_heading(doc, "4.6 Recursos Principais", level=2)
add_paragraph(doc,
    "Plataforma tecnológica (web + mobile); Base de dados de músicos e contratantes; Integração com APIs "
    "(Spotify, Instagram, Stripe); Equipe (founder + devs + marketing)."
)

add_heading(doc, "4.7 Atividades-Chave", level=2)
add_paragraph(doc,
    "Desenvolvimento e manutenção da plataforma; Aquisição de usuários; Marketing digital e conteúdo; "
    "Suporte e moderação; Expansão geográfica."
)

add_heading(doc, "4.8 Parceiros-Chave", level=2)
add_paragraph(doc,
    "Spotify (API de repertório); Instagram/Meta (API de métricas); Gateways de pagamento (Stripe, PagSeguro); "
    "Escolas de música e conservatórios; Produtores de eventos."
)

add_heading(doc, "4.9 Estrutura de Custos", level=2)
add_table(doc,
    ["Categoria", "Itens"],
    [
        ["Tecnologia", "Servidores cloud, domínio, APIs"],
        ["Pessoal", "Devs, design, marketing"],
        ["Marketing", "Tráfego pago, conteúdo, parcerias"],
        ["Operacional", "Contabilidade, jurídico, ferramentas"],
    ]
)

# ============================================================
# 5 PLANO OPERACIONAL
# ============================================================
doc.add_page_break()
add_heading(doc, "5 PLANO OPERACIONAL", level=1)

add_heading(doc, "5.1 Processos Principais", level=2)
add_paragraph(doc,
    "1) Onboarding de músicos: cadastro → conexão Spotify/Instagram → criação do perfil → primeira publicação.\n"
    "2) Onboarding de contratantes: cadastro → busca por filtros → envio de proposta → contratação → avaliação.\n"
    "3) Contratação: chat → negociação → pagamento → agendamento → evento → avaliação bilateral.\n"
    "4) Gestão de créditos: compra → utilização → renovação.\n"
    "5) Moderação: verificação de perfis, conteúdo reportado, resolução de disputas."
)

add_heading(doc, "5.2 Recursos Necessários", level=2)
add_table(doc,
    ["Tipo", "Descrição"],
    [
        ["Tecnológico", "Servidores cloud, domínio, SSL, CI/CD"],
        ["Humanos", "Founder (produto), 2 devs, 1 designer, 1 marketing"],
        ["Parceiros", "APIs Spotify/Instagram, gateway de pagamento, analytics"],
        ["Infraestrutura", "Workspace remoto, ferramentas (Slack, Notion, Figma)"],
    ]
)

add_heading(doc, "5.3 Estrutura Legal", level=2)
add_paragraph(doc,
    "MEI ou LTDA (a definir conforme escala); Termos de uso e política de privacidade (LGPD compliant); "
    "Contrato de prestação de serviços entre músico e contratante."
)

# ============================================================
# 6 PLANO DE MARKETING
# ============================================================
doc.add_page_break()
add_heading(doc, "6 PLANO DE MARKETING", level=1)

add_heading(doc, "6.1 Posicionamento", level=2)
add_paragraph(doc,
    "'O palco onde músicos autorais encontram seu público — no Brasil e no mundo.' O OnStage se posiciona como a "
    "plataforma de carreira para músicos independentes, combinando visibilidade global, ferramentas de marketing "
    "integradas e canal direto de contratação."
)

add_heading(doc, "6.2 Objetivos de Marketing", level=2)
add_table(doc,
    ["Objjetivo", "Meta (Ano 1)", "Meta (Ano 2)"],
    [
        ["Plugados cadastrados", "2.000", "8.000"],
        ["Contratantes ativos", "200", "800"],
        ["Shows contratados/mês", "50", "200"],
        ["CAC (custo de aquisição)", "< R$ 20", "< R$ 15"],
        ["NPS (satisfação)", "> 50", "> 60"],
        ["Retenção mensal (músicos)", "> 60%", "> 70%"],
    ]
)

add_heading(doc, "6.3 Estratégia de Precificação", level=2)
add_table(doc,
    ["Pacote", "Créditos", "Preço", "Uso"],
    [
        ["Starter (grátis)", "50", "R$ 0", "Onboarding, testar"],
        ["Pro", "100", "R$ 15", "Destaque por 1 semana"],
        ["Band", "500", "R$ 65", "Banda multi-membros"],
        ["Premium", "1.000", "R$ 110", "Profissional ativo"],
    ]
)

add_heading(doc, "6.4 Canais de Divulgação", level=2)

add_paragraph(doc, "Digital (principal):", bold=True)
add_table(doc,
    ["Canal", "Estratégia", "Orçamento/mês"],
    [
        ["Instagram", "Reels, bastidores, depoimentos", "R$ 500 (Ads)"],
        ["TikTok", "Desafios musicais, talentos", "R$ 300 (Ads)"],
        ["YouTube", "Entrevistas, tutoriais", "R$ 200 (Ads)"],
        ["Google Ads", "Busca por contratar banda/músico", "R$ 400"],
        ["SEO", "Blog com conteúdo para músicos", "Orgânico"],
        ["E-mail marketing", "Newsletter semanal", "R$ 50"],
    ]
)

add_paragraph(doc, "Parcerias:", bold=True)
add_paragraph(doc,
    "Escolas de música e conservatórios (co-marketing); Produtores de festivais (fornecedor oficial); "
    "Estúdios de gravação (indicação cruzada); Influenciadores musicais (embaixadores)."
)

add_paragraph(doc, "Growth/Orgânico:", bold=True)
add_paragraph(doc,
    "Programa de indicação (créditos por amigo); UGC (músicos compartilham perfis); SEO local; "
    "Comunidade ativa (grupos por cidade)."
)

add_heading(doc, "6.5 Estratégia de Fidelidade", level=2)
add_paragraph(doc,
    "Gamificação (badges: 'Primeiro show', '5 estrelas'); Progressão (Bronze → Prata → Ouro → Diamante); "
    "Recompensas por avaliação e indicação; Perfis verificados com selo 'OnStage Verified'."
)

add_heading(doc, "6.6 Marketing Internacional", level=2)
add_table(doc,
    ["Ação", "Detalhes"],
    [
        ["Localização", "PT/EN/ES desde o dia 1"],
        ["Segmentação geográfica", "Anúncios por país/região"],
        ["Conteúdo global", "Cases de músicos brasileiros no exterior"],
        ["Parcerias internacionais", "Agências de booking, festivais na Europa/EUA"],
        ["Presença em eventos", "SXSW, Web Summit, Lollapalooza"],
    ]
)

# ============================================================
# 7 PLANO FINANCEIRO
# ============================================================
doc.add_page_break()
add_heading(doc, "7 PLANO FINANCEIRO", level=1)

add_heading(doc, "7.1 Investimento Inicial", level=2)
add_table(doc,
    ["Item", "Valor"],
    [
        ["Desenvolvimento MVP (freelancers — 3 meses)", "R$ 15.000"],
        ["Design UI/UX", "R$ 3.000"],
        ["Infraestrutura (servidores, domínio)", "R$ 500/mês"],
        ["Marketing inicial (3 meses)", "R$ 4.500"],
        ["Registro de marca (INPI)", "R$ 1.500"],
        ["Contabilidade + jurídico", "R$ 2.000"],
        ["TOTAL", "R$ 26.500"],
    ]
)

add_heading(doc, "7.2 Custos Fixos Mensais", level=2)
add_table(doc,
    ["Item", "Valor/mês"],
    [
        ["Servidores e infraestrutura", "R$ 800"],
        ["Ferramentas (Notion, Figma, Slack)", "R$ 200"],
        ["Marketing recorrente", "R$ 1.500"],
        ["Contabilidade", "R$ 400"],
        ["TOTAL", "R$ 2.900"],
    ]
)

add_heading(doc, "7.3 Projeção de Receita (12 meses)", level=2)
add_table(doc,
    ["Mês", "Músicos", "Shows/mês", "Comissão méd.", "Receita"],
    [
        ["1", "50", "5", "R$ 100", "R$ 500"],
        ["2", "100", "10", "R$ 120", "R$ 1.200"],
        ["3", "200", "20", "R$ 150", "R$ 3.000"],
        ["4", "350", "35", "R$ 180", "R$ 6.300"],
        ["5", "500", "50", "R$ 200", "R$ 10.000"],
        ["6", "700", "70", "R$ 220", "R$ 15.400"],
        ["7", "900", "90", "R$ 250", "R$ 22.500"],
        ["8", "1.100", "110", "R$ 280", "R$ 30.800"],
        ["9", "1.300", "130", "R$ 300", "R$ 39.000"],
        ["10", "1.500", "150", "R$ 320", "R$ 48.000"],
        ["11", "1.700", "170", "R$ 350", "R$ 59.500"],
        ["12", "2.000", "200", "R$ 380", "R$ 76.000"],
    ]
)

add_image(doc, os.path.join(ASSETS_DIR, "projecao_financeira.png"), width=5.5)
add_caption(doc, "Figura 5 — Projeção financeira 12 meses: receita vs. custos estimados. Fonte: elaborado pelo autor.")

add_heading(doc, "7.4 Indicadores Financeiros", level=2)
add_table(doc,
    ["Indicador", "Valor projetado"],
    [
        ["Break-even", "Mês 5"],
        ["Payback do investimento", "Mês 7"],
        ["Receita acumulada (Ano 1)", "R$ 312.200"],
        ["Margem líquida média", "35–45%"],
    ]
)

add_heading(doc, "7.5 Premissas", level=2)
add_paragraph(doc,
    "Preço médio do show: R$ 800–2.000; Comissão: 12% sobre cada show; Crescimento de músicos: 15–20% ao mês; "
    "CAC: R$ 20 por músico (orgânico + Ads)."
)

# ============================================================
# REFERÊNCIAS
# ============================================================
doc.add_page_break()
add_heading(doc, "REFERÊNCIAS", level=1)

references = [
    "CUSTOM MARKET INSIGHTS. Global Live Music Market Size, Trends, Share 2025-2034. 2026. "
    "Disponível em: https://www.custommarketinsights.com/report/live-music-market/. Acesso em: 03 set. 2026.",
    "FIRJAN. Mapeamento da Indústria Criativa 2025. 8. ed. Rio de Janeiro: Firjan, 2025. "
    "Disponível em: https://observatorio.firjan.com.br/inteligencia-competitiva/mapeamento-da-industria-criativa-2025. "
    "Acesso em: 03 set. 2026.",
    "GRAND VIEW RESEARCH. Creator Economy Market Size, Share & Industry Report, 2026-2033. 2026. "
    "Disponível em: https://www.grandviewresearch.com/industry-analysis/creator-economy-market-report. "
    "Acesso em: 03 set. 2026.",
    "IFPI. Global Music Report 2026: State of the Industry. 2026. "
    "Disponível em: https://www.ifpi.org/global-music-report-2026-global-recorded-music-revenues-grow-6-4-as-record-companies-drive-innovation/. "
    "Acesso em: 03 set. 2026.",
    "MARKET.US. Creator Economy Market Size, Share | CAGR of 21.8%. 2026. "
    "Disponível em: https://market.us/report/creator-economy-market/. Acesso em: 03 set. 2026.",
    "MDIC. Estatísticas de Comércio Exterior. 2026. "
    "Disponível em: https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior/estatisticas. Acesso em: 03 set. 2026.",
    "MORDOR INTELLIGENCE. United States Live Music Market Size & Share Analysis. 2025. "
    "Disponível em: https://www.mordorintelligence.com/industry-reports/united-states-live-music-market. "
    "Acesso em: 03 set. 2026.",
    "RESEARCH AND MARKETS. Live Music Market Size, Competitors & Forecast to 2032. 2025. "
    "Disponível em: https://www.researchandmarkets.com/report/live-performances. Acesso em: 03 set. 2026.",
    "TECHNAVIO. Live Music Market Growth Analysis — Size and Forecast 2026-2030. 2026. "
    "Disponível em: https://www.technavio.com/report/live-music-market-industry-analysis. Acesso em: 03 set. 2026.",
    "UNCTAD. Creative Economy Outlook 2024. Geneva: UN, 2024. "
    "Disponível em: https://unctad.org/publication/creative-economy-outlook-2024. Acesso em: 03 set. 2026.",
    "UNCTAD. Data Hub — Global exports of creative goods and services. 2025. "
    "Disponível em: https://unctadstat.unctad.org/insights/theme/97. Acesso em: 03 set. 2026.",
]

for ref in references:
    p = doc.add_paragraph(ref)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE
    p.paragraph_format.first_line_indent = Cm(0)
    p.paragraph_format.left_indent = Cm(0)
    for run in p.runs:
        run.font.name = 'Arial'
        run.font.size = Pt(11)

# Save
doc.save(OUTPUT)
print(f"\nDocumento gerado com sucesso: {OUTPUT}")
