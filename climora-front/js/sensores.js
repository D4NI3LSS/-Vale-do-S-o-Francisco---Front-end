/* sensores.js — lista de sensores e histórico do sensor selecionado */
const sensores = [
  { id: 'S-01', setor: 'Setor A', cultura: 'Manga',  temp: 31.4, umidade: 52, status: 'online',  ultima: '30s' },
  { id: 'S-02', setor: 'Setor A', cultura: 'Manga',  temp: 30.8, umidade: 55, status: 'online',  ultima: '28s' },
  { id: 'S-03', setor: 'Setor B', cultura: 'Uva',    temp: 29.2, umidade: 61, status: 'online',  ultima: '45s' },
  { id: 'S-04', setor: 'Setor B', cultura: 'Uva',    temp: 28.7, umidade: 63, status: 'online',  ultima: '1min' },
  { id: 'S-05', setor: 'Setor C', cultura: 'Melão',  temp: 33.1, umidade: 47, status: 'online',  ultima: '15s' },
  { id: 'S-06', setor: 'Setor C', cultura: 'Melão',  temp: 0,    umidade: 0,  status: 'offline', ultima: '2h' },
  { id: 'S-07', setor: 'Setor D', cultura: 'Goiaba', temp: 27.5, umidade: 70, status: 'online',  ultima: '55s' },
  { id: 'S-08', setor: 'Setor D', cultura: 'Goiaba', temp: 0,    umidade: 0,  status: 'offline', ultima: '4h' },
];

const historico = {
  horas: ['00h', '04h', '08h', '12h', '16h', '20h'],
  temp:  [22, 20, 25, 31, 33, 27],
  umi:   [68, 74, 61, 52, 47, 59],
};

let selecionado = 'S-01';

const listaEl = document.getElementById('lista-sensores');
const tituloEl = document.getElementById('titulo-historico');
const metricasEl = document.getElementById('metricas-sensor');

function renderLista() {
  listaEl.innerHTML = sensores.map(s => {
    const online = s.status === 'online';
    return `
    <button class="sensor ${s.id === selecionado ? 'selected' : ''} ${online ? '' : 'offline'}" data-id="${s.id}" ${online ? '' : 'aria-disabled="true"'}>
      <div class="sensor__top">
        <span class="sensor__id">${s.id}</span>
        <span class="pill pill--sm ${online ? 'pill--green' : 'pill--red'}">${online ? '● Online' : '● Offline'}</span>
      </div>
      <div class="sensor__where">${s.setor} · ${s.cultura}</div>
      ${online ? `<div class="sensor__readings"><span class="c-gold">🌡 ${s.temp}°C</span><span class="c-cyan">💧 ${s.umidade}%</span></div>` : ''}
      <div class="sensor__last">Última leitura: ${s.ultima}</div>
    </button>`;
  }).join('');

  listaEl.querySelectorAll('.sensor').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = sensores.find(x => x.id === btn.dataset.id);
      if (s.status !== 'online') return; // sensor offline não pode ser selecionado
      selecionado = s.id;
      renderLista();
      renderDetalhe();
    });
  });
}

function renderDetalhe() {
  const s = sensores.find(x => x.id === selecionado);
  tituloEl.textContent = `Histórico — Sensor ${s.id}`;
  metricasEl.innerHTML = [
    { label: 'Temperatura',   valor: `${s.temp}°C`,  delta: '+2.1°',           cor: 'c-gold' },
    { label: 'Umidade',       valor: `${s.umidade}%`, delta: '-4%',             cor: 'c-cyan' },
    { label: 'Leituras hoje', valor: '1.440',         delta: 'intervalos 1min', cor: 'c-purple' },
  ].map(m => `
    <div class="card card--sm">
      <div class="stat__label" style="text-transform:none;letter-spacing:0;margin-bottom:4px">${m.label}</div>
      <div class="stat__value ${m.cor}" style="font-size:24px">${m.valor}</div>
      <div class="stat__sub">${m.delta}</div>
    </div>`).join('');
}

new Chart(document.getElementById('grafico-historico'), {
  type: 'line',
  data: {
    labels: historico.horas,
    datasets: [serie('Temp (°C)', historico.temp, Cores.ouro), serie('Umidade (%)', historico.umi, Cores.ciano)],
  },
  options: { scales: eixos(), interaction: { mode: 'index', intersect: false } },
});

renderLista();
renderDetalhe();
