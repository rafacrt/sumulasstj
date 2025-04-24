# ⚖️ JurisAtualiza

🧠 Extensão para Google Chrome que detecta automaticamente artigos jurídicos em páginas da web e traz **atualizações legislativas**, **jurisprudência** do STF e **súmulas do STJ** em tempo real.

---

## 📦 Funcionalidades

- 🔍 Detecta automaticamente artigos legais em páginas jurídicas (ex: Constituição, Códigos).
- 🖱️ Permite selecionar manualmente qualquer artigo ou trecho jurídico para análise.
- 📜 Busca atualizações em:
  - Constituição Federal (via Planalto)
  - Jurisprudência no STF
  - Súmulas do STJ
- 🧾 Interface simples e leve diretamente no Chrome.

---

## 🚀 Como usar

1. Clone ou baixe este repositório.
2. No Chrome, acesse: `chrome://extensions/`
3. Ative o **Modo de desenvolvedor**.
4. Clique em **“Carregar sem compactação”** e selecione a pasta da extensão.
5. Acesse um site como [Planalto.gov.br](https://www.planalto.gov.br) ou outro jurídico.
6. Selecione um artigo (ex: `Art. 5º`) com o mouse.
7. Clique no ícone da extensão → os dados aparecerão no popup.

---

## 🛠️ Tecnologias utilizadas

- 🧩 Chrome Extensions (Manifest v3)
- 📜 JavaScript puro
- 🌐 DOMParser + Fetch API para scraping
- 💾 Chrome Storage API
- 💡 Design minimalista via HTML/CSS nativo

---

## 🔐 Permissões solicitadas

- `activeTab` – para leitura da aba atual
- `storage` – para salvar o artigo detectado
- `scripting` e `<all_urls>` – para leitura e scraping das páginas de leis

---

## 🧪 Fontes consultadas

- [Planalto.gov.br](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm)
- [STF](https://www.stf.jus.br)
- [STJ](https://www.stj.jus.br)

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

---

## 💼 Ideal para

- Estudantes de Direito
- Concurseiros
- Operadores jurídicos
- Professores e pesquisadores

---

> Desenvolvido com 💻 por Rafael Medeiros
