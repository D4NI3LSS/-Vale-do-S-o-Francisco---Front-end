/* dashboard.js — gráficos e alertas da tela principal */
const climaHoras = ['00h', '03h', '06h', '09h', '12h', '15h', '18h', '21h'];
const climaTemp  = [22, 20, 19, 24, 31, 34, 30, 25];
const climaUmi   = [68, 72, 78, 65, 52, 45, 55, 63];

const semanas = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
const maturacao = {
  manga: [85, 88, 92, 78, 70, 65],
  uva:   [70, 75, 80, 85, 88, 90],
  melao: [60, 65, 70, 80, 85, 88],
};

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];
const volumeExport = [420, 380, 510, 470, 590, 630, 580];

const alertasRecentes = [
  { tipo: 'warning', msg: 'Temperatura acima do ideal para manga - Sensor #12', tempo: '12 min atrás' },
  { tipo: 'success', msg: 'Janela ideal de colheita detectada para uva - Setor B', tempo: '1h atrás' },
  { tipo: 'info',    msg: 'Dados do ThingSpeak sincronizados com sucesso', tempo: '2h atrás' },
];

// Temperatura & umidade
new Chart(document.getElementById('grafico-clima'), {
  type: 'line',
  data: {
    labels: climaHoras,
    datasets: [serie('Temp (°C)', climaTemp, Cores.ouro, true), serie('Umidade (%)', climaUmi, Cores.ciano, true)],
  },
  options: { scales: eixos(), interaction: { mode: 'index', intersect: false } },
});

// Índice de maturação
new Chart(document.getElementById('grafico-maturacao'), {
  type: 'line',
  data: {
    labels: semanas,
    datasets: [
      serie('Manga', maturacao.manga, Cores.ouro),
      serie('Uva', maturacao.uva, Cores.roxo),
      serie('Melão', maturacao.melao, Cores.ciano),
    ],
  },
  options: { scales: eixos({ min: 50, max: 100 }), interaction: { mode: 'index', intersect: false } },
});

// Volume de exportação
new Chart(document.getElementById('grafico-exportacao'), {
  type: 'bar',
  data: {
    labels: meses,
    datasets: [{ label: 'Volume (ton)', data: volumeExport, backgroundColor: 'rgba(245,158,11,0.85)', borderRadius: 4 }],
  },
  options: { scales: eixos(), plugins: { legend: { display: false } } },
});

// Alertas recentes
document.getElementById('alertas-recentes').innerHTML = alertasRecentes.map(a => `
  <div class="mini-alert mini-alert--${a.tipo}">
    <p>${a.msg}</p>
    <small>${a.tempo}</small>
  </div>`).join('');
