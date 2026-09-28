/* layout.js — proteção de rota, dados do usuário e menu lateral */
(function () {
  const pagina = document.body.dataset.page;
  const usuario = Auth.usuario();

  // Sem sessão -> volta ao login. Sem permissão -> volta ao dashboard.
  if (!usuario) { window.location.replace('../index.html'); return; }
  if (!Auth.podeAcessar(pagina)) { window.location.replace('dashboard.html'); return; }

  // Preenche o rodapé com os dados do usuário logado
  document.getElementById('user-iniciais').textContent = usuario.iniciais;
  document.getElementById('user-nome').textContent = usuario.nome;
  document.getElementById('user-perfil').textContent = usuario.perfil;

  // Esconde do menu o que o perfil não pode acessar (RBAC)
  document.querySelectorAll('.nav__link').forEach(link => {
    if (!Auth.podeAcessar(link.dataset.page)) link.classList.add('hidden');
  });

  // Sair
  document.getElementById('btn-sair').addEventListener('click', () => {
    Auth.sair();
    window.location.href = '../index.html';
  });

  // Menu móvel
  const sidebar = document.getElementById('sidebar');
  document.getElementById('menu-toggle').addEventListener('click', () => sidebar.classList.toggle('open'));
})();
