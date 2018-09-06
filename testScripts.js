var testObject ={
  x:1,
  y:2,
  setx:function (){
    this.x = 5
  },
  sety:function(){
    this.y = 6;
  },
  area:function (){
    return this.x* this.y;
  },
  internal:function (){
    this.x = 10;
    this.y = 20;
    this.setx();
  }
  
}

function runTest(){
  Logger.clear();
  testObject.setx();
  testObject.sety();
  testObject.internal();
  Logger.log(testObject.area());
  Logger.log(testObject.x);
}

function testValidation()
{
  Logger.clear();
  var result = SpreadsheetApp.getActiveSpreadsheet().getRange("emailTable").getValues();
  var row = 0;
  do{
    var entry = result[row];
    var name = result[row][0];
    var email = result[row][1];
    Logger.log(name + " " + email);
    row += 1;
  } while (name !="");
  
}

function testSS()
{
//  const ss = SpreadsheetApp.openById("160SN92swvMCd5XXeORyd1jYSdYBTBfVB7M0NJfHk_wQ");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Paths");
  // sheet.activate();
 
  Logger.log(sheet.getSheetName());
}

var TestCode = (function (){
  
  var name = "Tod";
  function logName(){
    Logger.log("I logged the name" + name);
  };
  return {
    pubName: logName,
    name:name
  };
}());



function testIIFE()
{
  Logger.log(TestCode.name);
  TestCode.name = "Fred";
  TestCode.pubName();
}