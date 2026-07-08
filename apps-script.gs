/**
 * Hamilton George Care, Florida franchise interest form.
 *
 * Google Apps Script web app that appends each form submission as a row in a
 * Google Sheet. See GOOGLE_SHEET_SETUP.md for step by step instructions.
 *
 * The front end (index.html) posts a JSON body with these keys:
 *   fullName, email, phone, region, background, capital, reason
 */

// Header row written the first time a submission arrives.
var HEADERS = [
  'Timestamp',
  'Full name',
  'Email',
  'Phone',
  'City or region',
  'Professional background',
  'Indicative capital',
  'Why it interests them'
];

function doPost(e) {
  // A lock stops two simultaneous submissions writing to the same row.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      new Date(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.region || '',
      data.background || '',
      data.capital || '',
      data.reason || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the deployment URL in a browser to confirm it is live.
function doGet() {
  return ContentService
    .createTextOutput('Hamilton George Care interest form endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
