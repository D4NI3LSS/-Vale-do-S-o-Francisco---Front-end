/* previsoes.js — cartões por cultura e gráficos preditivos */
const culturas = [
  { nome: 'Uva',    icone: '🍇', score: 94, janela: '25–28 Set',       cor: '#a78bfa', texto: 'Colheita altamente recomendada. Temperatura e umidade ideais.' },
  { nome: 'Melão',  icone: '🍈', score: 78, janela: '28 Set – 02 Out', cor: '#22d3ee', texto: 'Aguardar mais 3 dias para maior teor de açúcar.' },
  { nome: 'Manga',  icone: '🥭', score: 72, janela: '02–06 Out',       cor: '#f59e0b', texto: 'Temperatura levemente acima do ideal. Monitorar umidade.' },
];

const dias = ['24/09', '25/09', '26/09', '27/09', '28/09', '29/09', '30/09'];
const janela = {
  manga: [72, 75, 80, 78, 76, 73, 70],
  uva:   [88, 91, 94, 96, 92, 87, 82],
  melao: [60, 63, 67, 71, 75, 78, 80],
};

const semanas = ['S1', 'S2', 'S3', 'S4', 'S5'];
const precos = {
  manga: [4.2, 4.8, 5.1, 4.9, 5.4],
  uva:   [8.5, 9.1, 8.8, 9.4, 9.8],
  melao: [2.1, 2.4, 2.6, 2.9, 3.1],
};

document.getElementById('cartoes-cultura').innerHTML = culturas.map(c => `
  <div class="card">
    <div class="culture__head">
      <span class="culture__icon">${c.icone}</span>
      <span class="card__title">${c.nome}</span>
    </div>
    <div class="progress-row"><span>Índice de prontidão</span><span style="color:${c.cor}">${c.score}%</span></div>
    <div class="progress"><div class="progress__fill" style="width:${c.score}%;background:${c.cor}"></div></div>
    <div class="culture__window">Janela: <span style="color:${c.cor}">${c.janela}</span></div>
    <p class="culture__text">${c.texto}</p>
  </div>`).join('');

new Chart(document.getElementById('grafico-janela'), {
  type: 'line',
  data: {
    labels: dias,
    datasets: [
      serie('Manga', janela.manga, Cores.ouro, true),
      serie('Uva', janela.uva, Cores.roxo, true),
      serie('Melão', janela.melao, Cores.ciano, true),
    ],
  },
  options: { scales: eixos({ min: 50, max: 100 }), interaction: { mode: 'index', intersect: false } },
});

new Chart(document.getElementById('grafico-precos'), {
  type: 'bar',
  data: {
    labels: semanas,
    datasets: [
      { label: 'Manga', data: precos.manga, backgroundColor: Cores.ouro, borderRadius: 3 },
      { label: 'Uva',   data: precos.uva,   backgroundColor: Cores.roxo, borderRadius: 3 },
      { label: 'Melão', data: precos.melao, backgroundColor: Cores.ciano, borderRadius: 3 },
    ],
  },
  options: { scales: eixos() },
});
