/* login.js — comportamento da tela de login */
(function () {
  const form = document.getElementById('form-login');
  const inputEmail = document.getElementById('email');
  const inputSenha = document.getElementById('senha');
  const erro = document.getElementById('erro-login');
  const lista = document.getElementById('lista-demo');

  // Já logado? Vai direto para o dashboard.
  if (Auth.usuario()) window.location.href = 'pages/dashboard.html';

  function preencher(conta) {
    inputEmail.value = conta.email;
    inputSenha.value = conta.senha;
    erro.classList.add('hidden');
  }

  // Monta as contas de demonstração
  Auth.CONTAS.forEach(conta => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'demo__item';
    btn.innerHTML = `<span>${conta.perfil} - ${conta.email}</span><span>Senha - ${conta.senha}</span>`;
    btn.addEventListener('click', () => preencher(conta));
    lista.appendChild(btn);
  });

  document.getElementById('auto-preencher').addEventListener('click', () => preencher(Auth.CONTAS[0]));

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (Auth.entrar(inputEmail.value, inputSenha.value)) {
      window.location.href = 'pages/dashboard.html';
    } else {
      erro.classList.remove('hidden');
    }
  });
})();
