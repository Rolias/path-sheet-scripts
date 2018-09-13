'use strict';

// FOR USE WITH
// Google Sheet http://bit.ly/pathtrack
// Script File: bit.ly/pathtrack-script
// REMINDER - Code exists on dev machine at /Users/tod-gentille/dev/clasp/path-update
// Develop from there to keep code in git repo up-to-date. Don't develop here.
// Use >clasp pull 
// To pull any updates made here.
// Use >clasp push
// To push code made on dev machine up here into scripts.
// onEdit() is triggered by editing and the IIFEs don't run prior to that. So objects
// created by IIFEs are not available.


/* exported onEdit */
/** 
* Clear the notified column anytime the Last Review column is updated
* so that emails will send again.
* 
**/
function onEdit() {
  //When the user changes the Last Review column clear the notified column.
  const ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var cell = ss.getCurrentCell();
  var col = cell.getColumn();
  var row = cell.getRow();

  const LAST_REVIEW_COL = 5;
  const NOTIFIED_COL = 8;

  const notifiedVal = ss.getRange(row, NOTIFIED_COL).getValue();
  Logger.log("row, col, notified " + row + " " + col + " " + notifiedVal);

  if ((col === LAST_REVIEW_COL) && (notifiedVal)) {
    ss.getRange(row, NOTIFIED_COL).setValue("false");
  }

}


/** 
* runCode() is set up to run from a daily trigger from 7-8 a.m.
* see Edit→Current Project's Triggers menu item
* @customfunction
* by adding the above line runCode is exposed to the sheet. I don't need it in this case
* but did want to remember how to do it.
* Since the code in the other tabs is wrapped in IIFEs it runs prior to the sendEmailReminder so
* objects are available. That IS NOT TRUE for the onEdit() function.
**/

function sendEmailReminder() {
  //const ss = SpreadsheetApp.openById("160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ");
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //This works for scripts bound to a sheet, no need to use ID
  const mySheet = ss.getSheetByName("Paths");
  PathCode.setSheet(mySheet);
  PathCode.emailReminder();
}