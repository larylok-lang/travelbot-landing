/**
 * TravelBot — recebe leads do formulário da landing page e grava na planilha.
 *
 * Como instalar:
 * 1. Abra a sua planilha do Google Sheets.
 * 2. Menu Extensões > Apps Script.
 * 3. Apague o conteúdo padrão e cole este arquivo inteiro.
 * 4. Deploy (Implantar) > Nova implantação > Tipo: App da Web.
 *      - Executar como: Eu (seu e-mail)
 *      - Quem pode acessar: Qualquer pessoa
 * 5. Copie a URL que termina em /exec e cole em SHEETS_ENDPOINT no HTML da landing page.
 */

var SHEET_NAME = 'Leads';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // evita corrida quando dois leads chegam juntos
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Cria o cabeçalho na primeira execução
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'E-mail', 'Telefone', 'Origem']);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.email || '',
      data.telefone || '',
      data.origem || 'Landing TravelBot'
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Permite testar a URL no navegador (GET)
function doGet() {
  return json({ ok: true, service: 'TravelBot leads', status: 'online' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
