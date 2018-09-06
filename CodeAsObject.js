'use strict';
var PathCode ={
  
  sheet: "",
  row: 0,
  pathName:"",
  hasPath: false,
  email:"",
  PATH_NAME_COL : 1,
  CL_COL: 3,
  NEXT_REVIEW_COL: 6,
  NOTIFIED_COL: 7,
  DEFAULT_EMAIL: "tod-gentille@pluralsight.com",
  START_ROW: 2,
  emailsSent: false,
  
  
  
  emailReminder: function(){
    if (this.sheet === null) {
      Logger.log("The sheet is null - check openById call for accuracy.");
      return;
    }
    this.row = this.START_ROW;
    do{
      this.row +=1;
      this.setPathInfo();
      if (!this.hasPath) continue;
      if (!this.reviewIsDue()) continue;
      if (this.isNotified()) continue;
      
      this.sendEmail(this.getEmail(), this.pathName);
      Logger.log("sending email for "+this.pathName +" to " + this.getEmail());
      this.markAsNotified();
      this.emailsSent = true;
      
    } while (this.hasPath);
  },
  
  setPathInfo:function(){
    this.pathName= this.sheet.getRange(this.row,this.PATH_NAME_COL).getValue(); 
    this.hasPath = this.pathName !="";
    Logger.log(this.row +" "+ this.pathName);
  },
  
  reviewIsDue: function(){
    const today = new Date();
    var nextReviewDate = this.sheet.getRange(this.row, this.NEXT_REVIEW_COL).getValue();      
    jsNextDate = new Date(nextReviewDate);
    return (today >= nextReviewDate);
  },
  
  isNotified: function (){
    return this.sheet.getRange(this.row, this.NOTIFIED_COL).getValue();
  },
  
  getEmail: function (){
    const NAME_INDEX = 0;
    const EMAIL_INDEX =1;
    var cl = this.sheet.getRange(this.row,this.CL_COL).getValue();
    var result = this.sheet.getRange("emailTable").getValues();
    var emailRow = 0;
    do {
      if (result[emailRow][NAME_INDEX] === cl){
        return result[emailRow][EMAIL_INDEX];
      }
      emailRow += 1;
    }while (result[emailRow][NAME_INDEX] != "");
    
    return DEFAULT_EMAIL;
  },
  
  sendEmail: function (){
    const url="https://docs.google.com/spreadsheets/d/160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ/edit#gid=0";
    const body = "It's time for the  <a href=" + url +">"+ this.pathName +"path </a> to be reviewed.";
    const subject = "Path Update Reminder";
    var recipient = this.getEmail();
    this.sendEmailPrimitive(recipient, subject, body);  
  },
  
  sendEmailPrimitive: function (recipient, subject, body){
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body,  
    });
    Logger.log("Remaining Daily eMail Quota " + MailApp.getRemainingDailyQuota());
  },
  
  markAsNotified: function(){
    this.sheet.getRange(this.row,this.NOTIFIED_COL).setValue(true);
  }
  
}

// runCode() is set up to run from a daily trigger from 7-8 a.m.
// see Edit→Current Project's Triggers menu item
function runCode(){
  const ss =  SpreadsheetApp.openById("160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ");
  PathCode.sheet = ss.getSheetByName("Paths");
  PathCode.emailsSent = false;
  Logger.log("Daily run.");
  PathCode.emailReminder();
  if (!PathCode.emailsSent){
    PathCode.sendEmailPrimitive("tod-gentille@pluralsight.com","Test Google App script","If this gets sent it means my daily script ran but no emails were sent out.");
  }
}


