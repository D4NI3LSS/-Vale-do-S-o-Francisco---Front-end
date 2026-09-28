/* admin.js — gerenciamento de usuários e perfis (RF12) */
let usuarios = [
  { id: 1, nome: 'Carlos Lima',   email: 'admin@climora.com.br',     perfil: 'Administrador',       status: 'ativo',   ultimoAcesso: 'Agora mesmo',  iniciais: 'CL', cor: '#f59e0b' },
  { id: 2, nome: 'Ana Souza',     email: 'ana@climora.com.br',       perfil: 'Analista de Dados',   status: 'ativo',   ultimoAcesso: '2h atrás',     iniciais: 'AS', cor: '#a78bfa' },
  { id: 3, nome: 'João Ferreira', email: 'joao@fazendaferreira.com', perfil: 'Produtor/Exportador', status: 'ativo',   ultimoAcesso: '1h atrás',     iniciais: 'JF', cor: '#22d3ee' },
  { id: 4, nome: 'Maria Costa',   email: 'maria@exportfruta.com',    perfil: 'Produtor/Exportador', status: 'ativo',   ultimoAcesso: '3h atrás',     iniciais: 'MC', cor: '#4ade80' },
  { id: 5, nome: 'Pedro Alves',   email: 'pedro@climora.com.br',     perfil: 'Analista de Dados',   status: 'inativo', ultimoAcesso: '5 dias atrás', iniciais: 'PA', cor: '#f87171' },
  { id: 6, nome: 'Lucia Martins', email: 'lucia@fazendaexport.com',  perfil: 'Produtor/Exportador', status: 'ativo',   ultimoAcesso: 'Ontem',        iniciais: 'LM', cor: '#f59e0b' },
];

const COR_PERFIL = { 'Administrador': '#f59e0b', 'Analista de Dados': '#a78bfa', 'Produtor/Exportador': '#22d3ee' };

const statsEl = document.getElementById('stats-usuarios');
const corpoEl = document.getElementById('corpo-tabela');
const buscaEl = document.getElementById('busca');

function renderStats() {
  const dados = [
    ['Total de usuários', usuarios.length],
    ['Usuários ativos', usuarios.filter(u => u.status === 'ativo').length],
    ['Administradores', usuarios.filter(u => u.perfil === 'Administrador').length],
    ['Analistas', usuarios.filter(u => u.perfil === 'Analista de Dados').length],
  ];
  statsEl.innerHTML = dados.map(([label, valor]) => `
    <div class="card card--sm stat--simple">
      <div class="stat__value">${valor}</div>
      <div class="stat__label" style="font-size:12px;color:var(--blue-400)">${label}</div>
    </div>`).join('');
}

function renderTabela() {
  const termo = buscaEl.value.toLowerCase();
  const lista = usuarios.filter(u => u.nome.toLowerCase().includes(termo) || u.email.toLowerCase().includes(termo));

  if (lista.length === 0) {
    corpoEl.innerHTML = '<tr><td colspan="5" class="empty">Nenhum usuário encontrado.</td></tr>';
    return;
  }

  corpoEl.innerHTML = lista.map(u => {
    const cp = COR_PERFIL[u.perfil];
    const ativo = u.status === 'ativo';
    return `
    <tr>
      <td>
        <div class="user-cell">
          <div class="avatar" style="background:${u.cor}22;color:${u.cor};border-color:${u.cor}55">${u.iniciais}</div>
          <div><div class="user-cell__name">${u.nome}</div><div class="user-cell__mail">${u.email}</div></div>
        </div>
      </td>
      <td><span class="pill" style="background:${cp}15;color:${cp};border-color:${cp}35">${u.perfil}</span></td>
      <td><span class="pill ${ativo ? 'pill--green' : 'pill--red'}">${ativo ? '● Ativo' : '● Inativo'}</span></td>
      <td class="td-muted">${u.ultimoAcesso}</td>
      <td>
        <div class="row-actions">
          <button class="btn-outline" data-toggle="${u.id}">${ativo ? 'Desativar' : 'Ativar'}</button>
          <button class="btn-outline">Editar</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

corpoEl.addEventListener('click', e => {
  const btn = e.target.closest('[data-toggle]');
  if (!btn) return;
  const u = usuarios.find(x => x.id === Number(btn.dataset.toggle));
  u.status = u.status === 'ativo' ? 'inativo' : 'ativo';
  renderStats();
  renderTabela();
});

buscaEl.addEventListener('input', renderTabela);

renderStats();
renderTabela();
