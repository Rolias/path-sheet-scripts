`use strict`;
var Email = (function () {

    const DEFAULT_EMAIL = "tod-gentille@pluralsight.com";

    function sendToDefault(msg) {
        sendEmailPrimitive("Path App Script Log Message", msg);
    }
    function send(recipient, pathName) {
        const url = "https://docs.google.com/spreadsheets/d/160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ/edit#gid=0";
        const body = "It's time for the  <a href=" + url + ">" + pathName + "path </a> to be reviewed.";
        const subject = "Path Update Reminder";
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

    return {
        sendToDefault: sendToDefault,
        send: send,
    }
}());