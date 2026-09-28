# CLIMORA — Front-end

Front-end em **HTML + CSS + JavaScript puro**, com cada tecnologia em arquivos separados.

## Como abrir
Abra `index.html` no navegador (ou use a extensão Live Server do VS Code).
Os gráficos usam Chart.js via CDN, então é preciso internet.

## Estrutura
```
index.html            Tela de login
pages/                dashboard, sensores, previsoes, alertas, relatorios, admin (.html)
css/                  base.css, layout.css, components.css, login.css
js/                   auth.js, layout.js, charts-theme.js + um .js por tela
```

## Contas de demonstração
| Perfil        | E-mail                     | Senha |
|---------------|----------------------------|-------|
| Produtor      | joao@fazendaferreira.com   | 1234  |
| Analista      | ana@climora.com.br         | 5678  |
| Administrador | admin@climora.com.br       | admin |

Somente o Administrador enxerga a tela "Administração" (RBAC — RF08/RF12).

## Para integrar com o back-end
- `js/auth.js`: trocar a validação local por chamada à API de login.
- Dados fixos no topo de cada `js/<tela>.js`: trocar por `fetch()` na API
  (dados do ThingSpeak, previsões, alertas etc.).
- Não coloque as chaves do ThingSpeak no front (RNF02).
