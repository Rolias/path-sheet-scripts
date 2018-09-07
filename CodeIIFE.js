var PathCode = (function () {

  const PATH_NAME_COL = 1;
  const CL_COL = 3;
  const NEXT_REVIEW_COL = 6;
  const NOTIFIED_COL = 7;
  const DEFAULT_EMAIL = "tod-gentille@pluralsight.com";
  const START_ROW = 2;

  var sheet = "";
  var testValue = 10;
  var row = 0;
  var pathName = "";
  var hasPath = false;
  var email = "";
  var emailsSent = false;

  function setSheet(value) {

    Logger.log("The sheet type: " + typeof sheet);

    sheet = value;
  };

  function getEmailsSent() {
    return emailsSent;
  }

  function emailReminder() {
    if (typeof sheet !== 'object') {
      sendEmailPrimitive("App Code Error", "The sheet is not an object - something went seriously wrong.");
      return;
    }

    row = 1;
    do {
      row += 1;
      setPathInfo();
      if (!hasPath) continue;
      if (!reviewIsDue()) continue;
      if (isNotified()) continue;

      sendEmail(getEmail(), pathName);
      Logger.log("sending email for " + pathName + " to " + getEmail());
      markAsNotified();
      emailsSent = true;

    } while (hasPath);
  };


  function setPathInfo() {
    pathName = sheet.getRange(row, PATH_NAME_COL).getValue();
    hasPath = pathName != "";
    Logger.log(row + " " + pathName);
  };

  function reviewIsDue() {
    const today = new Date();
    var nextReviewDate = sheet.getRange(row, NEXT_REVIEW_COL).getValue();
    jsNextDate = new Date(nextReviewDate);
    return (today >= nextReviewDate);
  };

  function isNotified() {
    return sheet.getRange(row, NOTIFIED_COL).getValue();
  };

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

    return DEFAULT_EMAIL;
  };

  function sendEmail() {
    const url = "https://docs.google.com/spreadsheets/d/160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ/edit#gid=0";
    const body = "It's time for the  <a href=" + url + ">" + pathName + "path </a> to be reviewed.";
    const subject = "Path Update Reminder";
    var recipient = getEmail();
    sendEmailPrimitive(subject, body, recipient);
  };

  function sendEmailPrimitive(subject, body, recipient) {
    if (recipient === undefined) {
      recipient = DEFAULT_EMAIL;
    }
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body,
    });
    Logger.log("Remaining Daily eMail Quota " + MailApp.getRemainingDailyQuota());
  };

  function markAsNotified() {
    sheet.getRange(row, NOTIFIED_COL).setValue(true);
  };

  return {
    emailReminder: emailReminder,
    setSheet: setSheet,
    getEmailsSent: getEmailsSent,
    testValue: testValue,
    sendEmailPrimitive: sendEmailPrimitive
  }
}());



