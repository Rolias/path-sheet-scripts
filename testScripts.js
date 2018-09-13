var testObject = {
  x: 1,
  y: 2,
  setx: function () {
    this.x = 5
  },
  sety: function () {
    this.y = 6;
  },
  area: function () {
    return this.x * this.y;
  },
  internal: function () {
    this.x = 10;
    this.y = 20;
    this.setx();
  }
}

function testUrlGet(){
  const API_KEY_PARAM = '?api_key='; //If you want this to work you need a valid key to put here.
  const API_SUFFIX = '&includeRelated=true&includeTags=false&useCanonical=true';
  const userWord='tendentious';
  var apiCall = 'https://api.wordnik.com/v4/word.json/'+userWord+'/definitions'+ API_KEY_PARAM+ API_SUFFIX;
  result = UrlFetchApp.fetch(apiCall);
  var resultJson = JSON.parse(result);
  Logger.log(resultJson[0].word);
  Logger.log(resultJson[0].text);

}

function runTest() {
  Logger.clear();
  testObject.setx();
  testObject.sety();
  testObject.internal();
  Logger.log(testObject.area());
  Logger.log(testObject.x);
}

function testValidation() {
  Logger.clear();
  var result = SpreadsheetApp.getActiveSpreadsheet().getRange("emailTable").getValues();
  var row = 0;
  do {
    var entry = result[row];
    var name = result[row][0];
    var email = result[row][1];
    Logger.log(name + " " + email);
    row += 1;
  } while (name != "");
  
}

function testSS() {
  //  const ss = SpreadsheetApp.openById("160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Paths");
  // sheet.activate();
  
  Logger.log(sheet.getSheetName());
}

var TestCode = (function () {
  
  var name = "Tod";
  function logName() {
    Logger.log("I logged the name" + name);
  };
  return {
    pubName: logName,
    name: name
  };
}());

function blankRowTest(){
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //This works for scripts bound to a sheet, no need to use ID
  const mySheet = ss.getSheetByName("Paths");
  
  var nextReviewDate = mySheet.getRange(16, 6).getValue();
  Logger.log(nextReviewDate);
  if (nextReviewDate ==="")Logger.log("it's blank");
  
}

function testIIFE() {
  Logger.log(TestCode.name);
  TestCode.name = "Fred";
  TestCode.pubName();
}

function testSheetIsUndefined() {
  PathCode.emailReminder();
}