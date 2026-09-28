/* relatorios.js — relatórios de segurança e qualidade (RF11) */
const relatorios = [
  { id: 'REL-001', tipo: 'Qualidade',  titulo: 'Relatório de Testes Automatizados — Sprint 3', descricao: 'Cobertura de testes: 87%. 142 casos de teste executados. 5 falhas identificadas e corrigidas.', data: '23/09/2024', autor: 'Ana Souza',     status: 'concluido',    tamanho: '1.2 MB' },
  { id: 'REL-002', tipo: 'Segurança',  titulo: 'Relatório de Acessos — Setembro 2024',         descricao: '384 logins bem-sucedidos, 12 tentativas bloqueadas. Nenhum incidente de segurança registrado.', data: '22/09/2024', autor: 'Carlos Lima',   status: 'concluido',    tamanho: '0.8 MB' },
  { id: 'REL-003', tipo: 'Safra',      titulo: 'Análise de Colheita — Uva Setor B',            descricao: 'Volume colhido: 48 ton. Desvio de temperatura: ±1.2°C. Índice de perdas: 2.1%.', data: '20/09/2024', autor: 'João Ferreira', status: 'concluido',    tamanho: '2.3 MB' },
  { id: 'REL-004', tipo: 'Exportação', titulo: 'Logística de Exportação — Q3 2024',            descricao: 'Volume exportado: 1.580 ton. Destinos: UE (62%), EUA (28%), Outros (10%). Receita estimada: R$ 12,4M.', data: '18/09/2024', autor: 'João Ferreira', status: 'concluido',    tamanho: '3.7 MB' },
  { id: 'REL-005', tipo: 'Segurança',  titulo: 'Relatório de Incidentes — Agosto 2024',        descricao: 'Em processamento. Análise de logs em andamento.', data: '24/09/2024', autor: 'Carlos Lima',   status: 'processando',  tamanho: '—' },
];

const COR_TIPO = { Qualidade: '#a78bfa', Segurança: '#f87171', Safra: '#4ade80', Exportação: '#f59e0b' };

const resumo = [
  { label: 'Relatórios gerados', valor: '47',  sub: 'este mês' },
  { label: 'Testes executados',  valor: '142', sub: 'Sprint 3' },
  { label: 'Taxa de cobertura',  valor: '87%', sub: 'automatizado' },
  { label: 'Incidentes abertos', valor: '0',   sub: 'setembro' },
];

document.getElementById('resumo-relatorios').innerHTML = resumo.map(r => `
  <div class="card card--sm stat--simple">
    <div class="stat__value">${r.valor}</div>
    <div class="stat__label">${r.label}</div>
    <div class="stat__sub">${r.sub}</div>
  </div>`).join('');

document.getElementById('lista-relatorios').innerHTML = relatorios.map(r => {
  const cor = COR_TIPO[r.tipo] || '#22d3ee';
  const ok = r.status === 'concluido';
  return `
  <div class="item item--report">
    <div class="item__bar" style="background:${cor}"></div>
    <div class="item__body">
      <div class="item__head">
        <div>
          <span class="badge" style="background:${cor}22;color:${cor}">${r.tipo}</span>
          <span class="item__title">${r.titulo}</span>
        </div>
        <div class="item__actions">
          <span class="pill pill--sm ${ok ? 'pill--green' : 'pill--gold'}">${ok ? 'Concluído' : 'Processando…'}</span>
          ${ok ? '<button class="btn-ghost">↓ Download</button>' : ''}
        </div>
      </div>
      <p class="item__desc">${r.descricao}</p>
      <div class="item__meta item__meta--dim">
        <span>${r.id}</span><span>${r.data}</span><span>Por ${r.autor}</span>${r.tamanho !== '—' ? `<span>${r.tamanho}</span>` : ''}
      </div>
    </div>
  </div>`;
}).join('');
