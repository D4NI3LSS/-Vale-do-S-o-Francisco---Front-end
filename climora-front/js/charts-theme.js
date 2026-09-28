/* charts-theme.js — tema escuro do Chart.js e funções auxiliares */
const Cores = {
  ouro: '#f59e0b', ciano: '#22d3ee', roxo: '#a78bfa', verde: '#4ade80',
  texto: '#93c5fd', grade: 'rgba(255,255,255,0.05)',
};

Chart.defaults.color = Cores.texto;
Chart.defaults.font.size = 11;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.plugins.legend.labels.boxWidth = 10;
Chart.defaults.plugins.tooltip.backgroundColor = '#0f2236';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(34,211,238,0.2)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.cornerRadius = 8;

/** Degradê vertical usado nos gráficos de área */
function degrade(ctx, cor) {
  const g = ctx.createLinearGradient(0, 0, 0, 220);
  g.addColorStop(0.05, cor + '4d'); // ~30% de opacidade
  g.addColorStop(0.95, cor + '00');
  return g;
}

/** Opções de eixos padrão (sem linhas nas bordas, grade discreta) */
function eixos(extra = {}) {
  return {
    x: { grid: { color: Cores.grade }, border: { display: false } },
    y: { grid: { color: Cores.grade }, border: { display: false }, ...extra },
  };
}

/** Dataset de linha/área */
function serie(rotulo, dados, cor, area = false) {
  return {
    label: rotulo, data: dados, borderColor: cor, borderWidth: 2, tension: 0.4, pointRadius: 0,
    fill: area,
    backgroundColor: area ? ctx => degrade(ctx.chart.ctx, cor) : cor,
  };
}
