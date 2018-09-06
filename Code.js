//*
// Clear the notified column anytime the Last Review column is updated
// so that emails will send again.
function onEdit() {
  //When the user changes the Last Review column clear the notified column.
  const ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var cell = ss.getCurrentCell();
  var col = cell.getColumn();
  var row = cell.getRow();

  const LAST_REVIEW_COL = 5;
  const NOTIFIED_COL = 7;

  const notifiedVal = ss.getRange(row, NOTIFIED_COL).getValue();
  Logger.log("row, col, notifiedvaal " + row + " " + col + " " + notifiedVal);


  if ((col === LAST_REVIEW_COL) && (notifiedVal)) {
    ss.getRange(row, NOTIFIED_COL).setValue("false");
  }

}

// SEE THE CodeAsObject.gs script for the automated email functions.


// runCode() is set up to run from a daily trigger from 7-8 a.m.
// see Edit→Current Project's Triggers menu item
function runCode3() {
  const ss = SpreadsheetApp.openById("160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ");
  const mySheet = ss.getSheetByName("Paths");
  PathCode.setSheet(mySheet);
  PathCode.testValue = 22;
  PathCode.emailsSent = false;
  Logger.log("Daily run using clasp - changed locally.");
  PathCode.emailReminder();
  if (!PathCode.getEmailsSent()) {
    PathCode.sendEmailPrimitive("tod-gentille@pluralsight.com", "Test Google App script", "If this gets sent it means my daily script ran but no emails were sent out.");
  }
}
