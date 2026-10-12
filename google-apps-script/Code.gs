/**
 * Care Setu waitlist receiver for Google Apps Script.
 * Set SHEET_ID, then deploy as a Web App accessible to anyone.
 */
const SHEET_ID = 'REPLACE_WITH_YOUR_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Responses';

// Keep the original columns in place so existing response rows remain aligned.
// New submissions reuse the legacy willingness-to-pay column and use the appended columns.
const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Role',
  'Interest Level',
  'Features Selected',
  'Most Valuable Feature (legacy)',
  'Willingness To Pay',
  'Missing Features',
  'General Feedback',
  'Source (legacy)',
  'User Agent (legacy)',
  'Care Settings',
  'Service Models to Explore',
  'Features to Exclude',
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
      const serviceModels = clean_(data.serviceModels, 600)
        .split(' | ')
        .filter(Boolean)
        .map((model) => model === 'Other' && clean_(data.serviceModelOther, 300)
          ? 'Other: ' + clean_(data.serviceModelOther, 300)
          : model)
        .join(' | ');

      sheet.appendRow([
        new Date(),
        clean_(data.name, 120),
        clean_(data.email, 254).toLowerCase(),
        clean_(data.role, 600),
        clean_(data.interestLevel, 80),
        clean_(data.featuresSelected, 1200),
        '', // Legacy single-feature field; the form now supports multi-select.
        clean_(data.willingnessToPay, 180),
        clean_(data.missingFeatures, 3000),
        clean_(data.generalFeedback, 3000),
        '', // Source URLs are not collected for new responses.
        '', // Browser user-agent strings are not collected for new responses.
        clean_(data.careSettings, 600),
        clean_(serviceModels, 600),
        clean_(data.featuresToExclude, 1200),
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
  return jsonResponse_({ ok: true, service: 'Care Setu waitlist' });
}

function validateSubmission_(data) {
  const email = clean_(data.email, 254);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'A valid email is required.';

  const interestLevel = clean_(data.interestLevel, 80);
  const validInterestLevels = [
    'Definitely interested',
    'Probably interested',
    'Maybe',
    'Probably not',
    'Not interested',
  ];
  if (validInterestLevels.indexOf(interestLevel) === -1) return 'A valid interest level is required.';
  if (!clean_(data.featuresSelected, 1200)) return 'Select at least one feature.';

  const serviceModels = clean_(data.serviceModels, 600).split(' | ');
  if (serviceModels.indexOf('Other') !== -1 && !clean_(data.serviceModelOther, 300)) {
    return 'Describe the other service model.';
  }

  return '';
}

function clean_(value, maxLength) {
  let text = String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
  // Prevent user-entered feedback from being interpreted as a spreadsheet formula.
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Run after deployment to create the header row or append the new survey columns. */
function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}
