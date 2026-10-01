/**
 * CareSetu waitlist receiver for Google Apps Script.
 * Set SHEET_ID, then deploy as a Web App accessible to anyone.
 */
const SHEET_ID = 'REPLACE_WITH_YOUR_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Responses';

const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Role',
  'Interest Level',
  'Features Selected',
  'Most Valuable Feature',
  'Willingness To Pay',
  'Missing Features',
  'General Feedback',
  'Source',
  'User Agent',
];

function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};
    const validationError = validateSubmission_(data);
    if (validationError) return jsonResponse_({ ok: false, error: validationError });

    // Honeypot: return success without storing bot submissions.
    if (clean_(data.website, 200)) return jsonResponse_({ ok: true });

    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Sheet tab "' + SHEET_NAME + '" was not found.');

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        clean_(data.name, 120),
        clean_(data.email, 254).toLowerCase(),
        clean_(data.role, 120),
        clean_(data.interestLevel, 80),
        clean_(data.featuresSelected, 800),
        clean_(data.mostValuableFeature, 160),
        clean_(data.willingnessToPay, 160),
        clean_(data.missingFeatures, 3000),
        clean_(data.generalFeedback, 3000),
        clean_(data.source, 500),
        clean_(data.userAgent, 500),
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: 'Unable to store submission.' });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: 'CareSetu waitlist' });
}

function validateSubmission_(data) {
  const email = clean_(data.email, 254);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'A valid email is required.';
  if (!clean_(data.interestLevel, 80)) return 'Interest level is required.';
  if (!clean_(data.featuresSelected, 800)) return 'At least one feature is required.';
  if (!clean_(data.mostValuableFeature, 160)) return 'Most valuable feature is required.';
  if (!clean_(data.willingnessToPay, 160)) return 'Willingness to pay is required.';
  return '';
}

function clean_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Run once if you want Apps Script to create/verify the header row. */
function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
}
