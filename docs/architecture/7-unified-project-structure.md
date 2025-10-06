# 7. Unified Project Structure
```plaintext
/dimidui-mvp
├── /assets
│   ├── /fonts (Atkinson Hyperlegible)
│   └── /icons (Lucide SVG)
├── /styles
│   ├── variables.css (design tokens)
│   ├── global.css
│   └── modules.css
├── /scripts
│   ├── supabase-client.js
│   ├── auth.js
│   ├── modules/
│   │   ├── m1-bateria.js
│   │   ├── m2-linha.js
│   │   ├── m5-operacao.js
│   │   ├── m6-palavra.js
│   │   ├── m8-ortografia.js
│   │   └── m9-leitura.js
│   ├── activity-runtime.js
│   └── dashboard.js
├── login.html
├── aluno-dashboard.html
├── atividade.html (runtime genérico)
├── professor-dashboard.html
├── professor-criar.html
└── professor-banco-questoes.html
```

---
