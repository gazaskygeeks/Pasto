'use strict';

var app = require('../../app/utils/index.js');
var getinfo = require('./get-info.js');
var postData;
var SCOPE = ['https://www.googleapis.com/auth/spreadsheets'];
var SHEET_ID = '1DY-JnL0myVggCoFIobL8FNIO3qlGg7mQOi97tzx8M4Q';
var sheetName='mealsheet';


module.exports = (req, res) => {
  getinfo.parseBody(req,(err,body)=>{

     postData = body;
    console.log("body" ,postData);

  });


  app.auth({
    scope: SCOPE
  }, (err, tokens) => {
    app.write({
      sheetId: SHEET_ID,
      token: tokens.access_token,
      sheetName: sheetName
    },postData,(err, writeSheet) => {
      console.log('err', err);
      console.log(require('util').inspect(writeSheet, {
        depth: null
      }));
      res.end(JSON.stringify(writeSheet));
    });
  });
}
