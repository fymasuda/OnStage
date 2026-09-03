"""
Gerador de gráficos para o Resumo Expandido OnStage.
Cria: projeção financeira, mercado de música ao vivo, economia criativa.
"""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import numpy as np
import os

ASSETS_DIR = r"E:\OnStage\documento\assets"

plt.rcParams.update({
    'font.family': 'DejaVu Sans',
    'font.size': 11,
    'axes.titlesize': 13,
    'axes.labelsize': 11,
    'figure.dpi': 150,
})

# === Chart 1: Projeção Financeira ===
months = list(range(1, 13))
receita = [500, 1200, 3000, 6300, 10000, 15400, 22500, 30800, 39000, 48000, 59500, 76000]
custos = [2900 + 500 + 1500] * 13  # fixo + variável estimado
# Custos crescem mais lentamente
custos_var = [2900 + 500 + r * 0.15 for r in receita]

fig, ax = plt.subplots(figsize=(10, 5))
ax.bar(months, receita, color='#533afd', alpha=0.85, label='Receita Projetada')
ax.bar(months, custos_var, color='#fbbf24', alpha=0.85, label='Custos Estimados')
ax.axhline(y=0, color='black', linewidth=0.5)
ax.set_xlabel('Mês')
ax.set_ylabel('Valor (R$)')
ax.set_title('OnStage — Projeção Financeira 12 Meses')
ax.set_xticks(months)
ax.legend(loc='upper left')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, p: f'R${x:,.0f}'))
plt.tight_layout()
fig.savefig(os.path.join(ASSETS_DIR, "projecao_financeira.png"), bbox_inches='tight')
plt.close()
print("Chart 1 OK: projecao_financeira.png")

# === Chart 2: Mercado Global de Música Ao Vivo ===
labels = ['2024', '2025', '2030\n(projeção)', '2032\n(projeção)']
values = [34.84, 38.58, 60.0, 71.34]  # USD bilhões

fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.bar(labels, values, color=['#533afd', '#533afd', '#fbbf24', '#fbbf24'], alpha=0.85, width=0.5)
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.8,
            f'US${val:.1f}B', ha='center', va='bottom', fontweight='bold', fontsize=11)
ax.set_ylabel('Receita (US$ bilhões)')
ax.set_title('Mercado Global de Música Ao Vivo — Tamanho e Projeção')
ax.set_ylim(0, 85)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
fig.savefig(os.path.join(ASSETS_DIR, "mercado_musica_ao_vivo.png"), bbox_inches='tight')
plt.close()
print("Chart 2 OK: mercado_musica_ao_vivo.png")

# === Chart 3: Creator Economy ===
labels_ce = ['2025', '2026\n(est.)', '2030\n(projeção)', '2033\n(projeção)']
values_ce = [252.3, 310.4, 528.4, 1345.5]

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(labels_ce, values_ce, marker='o', linewidth=2.5, color='#533afd', markersize=9)
ax.fill_between(range(len(labels_ce)), values_ce, alpha=0.15, color='#533afd')
for i, (x, y) in enumerate(zip(labels_ce, values_ce)):
    ax.annotate(f'US${y:.1f}B', (x, y), textcoords="offset points",
                xytext=(0, 12), ha='center', fontweight='bold', fontsize=10)
ax.set_ylabel('Valor (US$ bilhões)')
ax.set_title('Creator Economy Global — Crescimento Projetado (CAGR 23,3%)')
ax.set_ylim(0, 1600)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
fig.savefig(os.path.join(ASSETS_DIR, "creator_economy.png"), bbox_inches='tight')
plt.close()
print("Chart 3 OK: creator_economy.png")

# === Chart 4: Composição de Receita OnStage (Ano 1, estimativa) ===
receita_labels = ['Comissão\nsobre shows', 'Venda de\ncréditos', 'Perfis em\ndestaque', 'Assinatura\nestúdios']
receita_pct = [45, 30, 15, 10]
colors_pie = ['#533afd', '#7c5cff', '#fbbf24', '#fcd34d']

fig, ax = plt.subplots(figsize=(7, 5))
wedges, texts, autotexts = ax.pie(receita_pct, labels=receita_labels, autopct='%1.0f%%',
                                   colors=colors_pie, startangle=90,
                                   textprops={'fontsize': 10})
for t in autotexts:
    t.set_fontweight('bold')
ax.set_title('OnStage — Composição Estimada de Receita (Ano 1)')
plt.tight_layout()
fig.savefig(os.path.join(ASSETS_DIR, "composicao_receita.png"), bbox_inches='tight')
plt.close()
print("Chart 4 OK: composicao_receita.png")

# === Chart 5: Economia Criativa no Brasil ===
ec_labels = ['2021', '2022', '2023']
ec_pct = [3.20, 3.21, 3.59]

fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(ec_labels, ec_pct, color='#533afd', alpha=0.85, width=0.45)
for i, v in enumerate(ec_pct):
    ax.text(i, v + 0.03, f'{v:.2f}%', ha='center', fontweight='bold', fontsize=12)
ax.set_ylabel('% do PIB')
ax.set_title('Economia Criativa no Brasil — Participação no PIB (Firjan)')
ax.set_ylim(0, 4.5)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
fig.savefig(os.path.join(ASSETS_DIR, "economia_criativa_brasil.png"), bbox_inches='tight')
plt.close()
print("Chart 5 OK: economia_criativa_brasil.png")

print("\nTodos os gráficos gerados com sucesso!")
