/**
 * auth.js — autenticação e controle de acesso por perfil (RBAC, RF08).
 *
 * ATENÇÃO: isto é apenas uma simulação de front-end para demonstração.
 * Em produção, a validação de credenciais e permissões deve ser feita
 * no back-end (nunca guarde senhas no código do navegador — RNF02).
 */
const Auth = (() => {
  const CHAVE = 'climora:usuario';

  const CONTAS = [
    { nome: 'João Ferreira', email: 'joao@fazendaferreira.com', senha: '1234',  perfil: 'Produtor',      iniciais: 'JF' },
    { nome: 'Ana Souza',     email: 'ana@climora.com.br',       senha: '5678',  perfil: 'Analista',      iniciais: 'AS' },
    { nome: 'Carlos Lima',   email: 'admin@climora.com.br',     senha: 'admin', perfil: 'Administrador', iniciais: 'CL' },
  ];

  // Quais telas cada perfil pode acessar
  const PERMISSOES = {
    Produtor:      ['dashboard', 'sensores', 'previsoes', 'alertas', 'relatorios'],
    Analista:      ['dashboard', 'sensores', 'previsoes', 'alertas', 'relatorios'],
    Administrador: ['dashboard', 'sensores', 'previsoes', 'alertas', 'relatorios', 'admin'],
  };

  function entrar(email, senha) {
    const conta = CONTAS.find(c => c.email === email.trim().toLowerCase() && c.senha === senha);
    if (!conta) return null;
    const { senha: _omitida, ...publico } = conta; // não guarda a senha na sessão
    sessionStorage.setItem(CHAVE, JSON.stringify(publico));
    return publico;
  }

  function usuario() {
    try { return JSON.parse(sessionStorage.getItem(CHAVE)); } catch { return null; }
  }

  function sair() { sessionStorage.removeItem(CHAVE); }

  function podeAcessar(pagina) {
    const u = usuario();
    return !!u && PERMISSOES[u.perfil].includes(pagina);
  }

  return { CONTAS, entrar, usuario, sair, podeAcessar };
})();
