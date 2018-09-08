
/* exported PathCode */
var PathCode = (function () {
  'use strict';
  const PATH_NAME_COL = 1;
  const CL_COL = 3;
  const NEXT_REVIEW_COL = 6;
  const NOTIFIED_COL = 7;
  const START_ROW = 2;

  var sheet = "";
  var row = 0;
  var pathName = "";
  var hasPath = false;


  function setSheet(value) {
    Logger.log("The sheet type: " + typeof sheet);
    sheet = value;
  }

  function emailReminder() {
    if (typeof sheet !== 'object') {
      Email.sendToDefault("App Script Error-> The sheet is not an object - something went seriously wrong.");
      return;
    }

    row = START_ROW;
    do {
      row += 1;
      setPathInfo();
      if (!hasPath) continue;
      if (!reviewIsDue()) continue;
      if (isNotified()) continue;

      Email.send(getEmail(), pathName);
      Email.sendToDefault("sending email for " + pathName + " to " + getEmail());
      markAsNotified();

    } while (hasPath);

  }

  function setPathInfo() {
    pathName = sheet.getRange(row, PATH_NAME_COL).getValue();
    hasPath = pathName != "";
    Logger.log(row + " " + pathName);
  }

  function reviewIsDue() {
    const today = new Date();
    var nextReviewDate = sheet.getRange(row, NEXT_REVIEW_COL).getValue();
    return (today >= nextReviewDate);
  }

  function isNotified() {
    return sheet.getRange(row, NOTIFIED_COL).getValue();
  }

  function getEmail() {
    const NAME_INDEX = 0;
    const EMAIL_INDEX = 1;
    var cl = sheet.getRange(row, CL_COL).getValue();
    var result = sheet.getRange("emailTable").getValues();
    var emailRow = 0;
    do {
      if (result[emailRow][NAME_INDEX] === cl) {
        return result[emailRow][EMAIL_INDEX];
      }
      emailRow += 1;
    } while (result[emailRow][NAME_INDEX] != "");

    return Email.getDefaultEmail;
  }

  function markAsNotified() {
    sheet.getRange(row, NOTIFIED_COL).setValue(true);
  }

  return {
    emailReminder: emailReminder,
    setSheet: setSheet,
  };
}());



