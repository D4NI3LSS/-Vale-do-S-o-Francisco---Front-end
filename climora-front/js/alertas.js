/* alertas.js — lista de alertas com filtros e "marcar como lido" (RF09) */
let alertas = [
  { id: 1, tipo: 'critico', titulo: 'Temperatura crítica detectada',   descricao: 'Sensor S-05 registrou 36.2°C, acima do limite máximo de 35°C para Melão.', setor: 'Setor C', sensor: 'S-05', timestamp: '24/09 · 14:32', lido: false },
  { id: 2, tipo: 'sucesso', titulo: 'Janela de colheita ideal — Uva',   descricao: 'Condições climáticas e índice de maturação (96%) indicam janela ideal de colheita para Uva no Setor B.', setor: 'Setor B', sensor: 'S-03, S-04', timestamp: '24/09 · 13:10', lido: false },
  { id: 3, tipo: 'aviso',   titulo: 'Umidade abaixo do recomendado',    descricao: 'Umidade em 44% no Setor A — abaixo do mínimo de 48% para Manga.', setor: 'Setor A', sensor: 'S-01', timestamp: '24/09 · 11:45', lido: true },
  { id: 4, tipo: 'info',    titulo: 'Sincronização ThingSpeak concluída', descricao: 'Canal #2847392 sincronizado. 1.440 leituras importadas nas últimas 24h.', setor: '—', sensor: '—', timestamp: '24/09 · 10:00', lido: true },
  { id: 5, tipo: 'aviso',   titulo: 'Sensor S-06 offline',              descricao: 'Sem resposta do Sensor S-06 há 2 horas. Verifique conectividade do dispositivo.', setor: 'Setor C', sensor: 'S-06', timestamp: '24/09 · 08:30', lido: true },
  { id: 6, tipo: 'critico', titulo: 'Sensor S-08 offline',              descricao: 'Sensor S-08 não responde há 4 horas. Dados de temperatura do Setor D comprometidos.', setor: 'Setor D', sensor: 'S-08', timestamp: '24/09 · 06:15', lido: true },
];

const TIPOS = {
  critico: { bg: 'rgba(248,113,113,0.1)', borda: 'rgba(248,113,113,0.35)', cor: '#f87171', rotulo: 'Crítico', icone: '🚨' },
  aviso:   { bg: 'rgba(245,158,11,0.1)',  borda: 'rgba(245,158,11,0.35)',  cor: '#f59e0b', rotulo: 'Aviso',   icone: '⚠️' },
  sucesso: { bg: 'rgba(74,222,128,0.1)',  borda: 'rgba(74,222,128,0.35)',  cor: '#4ade80', rotulo: 'Sucesso', icone: '✅' },
  info:    { bg: 'rgba(34,211,238,0.08)', borda: 'rgba(34,211,238,0.25)',  cor: '#22d3ee', rotulo: 'Info',    icone: 'ℹ️' },
};

const FILTROS = [
  ['todos', 'Todos'], ['nao-lidos', 'Não lidos'], ['critico', 'Crítico'],
  ['aviso', 'Aviso'], ['sucesso', 'Sucesso'], ['info', 'Info'],
];

let filtro = 'todos';

const resumoEl = document.getElementById('resumo-alertas');
const filtrosEl = document.getElementById('filtros-alertas');
const listaEl = document.getElementById('lista-alertas');

function filtrar() {
  if (filtro === 'todos') return alertas;
  if (filtro === 'nao-lidos') return alertas.filter(a => !a.lido);
  return alertas.filter(a => a.tipo === filtro);
}

function render() {
  const naoLidos = alertas.filter(a => !a.lido).length;
  resumoEl.innerHTML = `${naoLidos > 0 ? `<span style="color:#fbbf24">${naoLidos} não lidos</span>` : 'Todos lidos'} · ${alertas.length} alertas total`;

  filtrosEl.innerHTML = FILTROS.map(([id, nome]) =>
    `<button class="chip ${filtro === id ? 'active' : ''}" data-filtro="${id}">${nome}</button>`).join('');

  const itens = filtrar();
  listaEl.innerHTML = itens.length === 0 ? '<div class="empty">Nenhum alerta neste filtro.</div>' : itens.map(a => {
    const t = TIPOS[a.tipo];
    return `
    <div class="item ${a.lido ? 'read' : ''}" style="background:${t.bg};border-color:${t.borda}">
      <div class="item__icon">${t.icone}</div>
      <div class="item__body">
        <div class="item__head">
          <div>
            <span class="badge" style="background:${t.cor}22;color:${t.cor}">${t.rotulo}</span>
            <span class="item__title">${a.titulo}</span>
          </div>
          <div class="item__actions">
            ${a.lido ? '' : `<button class="btn-ghost" data-lido="${a.id}">Marcar lido</button>`}
            <span class="item__time">${a.timestamp}</span>
          </div>
        </div>
        <p class="item__desc">${a.descricao}</p>
        ${a.setor !== '—' ? `<div class="item__meta"><span>Setor: ${a.setor}</span><span>Sensor: ${a.sensor}</span></div>` : ''}
      </div>
    </div>`;
  }).join('');
}

filtrosEl.addEventListener('click', e => {
  const btn = e.target.closest('[data-filtro]');
  if (!btn) return;
  filtro = btn.dataset.filtro;
  render();
});

listaEl.addEventListener('click', e => {
  const btn = e.target.closest('[data-lido]');
  if (!btn) return;
  const alerta = alertas.find(a => a.id === Number(btn.dataset.lido));
  if (alerta) alerta.lido = true;
  render();
});

render();
