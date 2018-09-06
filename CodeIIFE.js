var PathCode = (function () {
  //const ss = SpreadsheetApp.getActive().getSheetByName("Paths");
  const PATH_NAME_COL = 1;
  const CL_COL = 3;
  const NEXT_REVIEW_COL = 6;
  const NOTIFIED_COL = 7;
  const DEFAULT_EMAIL = "tod-gentille@pluralsight.com";
  const START_ROW = 2;
  
  var sheet= "";
  var testValue = 10;
  var row = 0;
  var pathName = "";
  var hasPath = false;
  var email = "";
  var emailsSent = false;
  Logger.log("IFFE Executed");
  
  function setSheet(value){
    sheet = value;
  };
  
  
  function getEmailsSent(){
    return emailsSent;
  }
  
  
  function emailReminder() {
    Logger.log("in emailReminder sheet = "+sheet);
    Logger.log("test value "+ testValue);
    if (sheet === null) {
      Logger.log("The sheet is null - check openById call for accuracy.");
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
    sendEmailPrimitive(recipient, subject, body);
  };
  
  function sendEmailPrimitive(recipient, subject, body) {
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
    emailsSent: emailsSent,
    testValue: testValue,
    sendEmailPrimitive: sendEmailPrimitive
  }
}());



