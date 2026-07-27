# TravelBot — Landing Page

Landing page do **TravelBot**, um consultor inteligente de viagens que funciona pelo WhatsApp: o viajante descreve o que deseja em linguagem natural e recebe recomendações de voos e oportunidades com milhas.

## Arquivos

| Arquivo | Descrição |
|---|---|
| `index.html` | A landing page completa (HTML, CSS e JS em um único arquivo, sem dependências externas). |
| `Codigo.gs` | Google Apps Script que recebe os leads do formulário e grava numa planilha do Google Sheets. |

## Formulário de leads

Ao clicar em qualquer botão de CTA, abre-se um formulário (nome, e-mail, telefone). Ao enviar:

1. Os dados são enviados para uma planilha do Google Sheets (se configurada).
2. O WhatsApp é aberto com a mensagem já preenchida.

### Como ligar ao Google Sheets

1. Abra sua planilha → **Extensões › Apps Script**.
2. Cole o conteúdo de `Codigo.gs`.
3. **Implantar › Nova implantação › App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Copie a URL que termina em `/exec`.
5. Em `index.html`, localize a linha:
   ```js
   var SHEETS_ENDPOINT = '';
   ```
   e cole a URL do Web App entre as aspas.

> **Observação:** a gravação no Google Sheets depende de uma requisição externa. Ela funciona quando o site está hospedado no seu próprio domínio (como no GitHub Pages). Independentemente da planilha, a abertura do WhatsApp sempre funciona.

## Configuração do WhatsApp

O número de destino está em `index.html`:

```js
var WHATSAPP = '5555996516013';
```

## Publicação

Servido via **GitHub Pages** a partir da branch `main`.
