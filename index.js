'use strict';
var https = require('https');
var google = require('googleapis');
var key = require('./key.json');
var accessextractdata = require('./server/extractdata.js');

var SHEET_ID = '1DY-JnL0myVggCoFIobL8FNIO3qlGg7mQOi97tzx8M4Q';
var jwtClient = new google.auth.JWT(key.client_email,
    null,
    key.private_key, ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    null);
jwtClient.authorize((err, tokens) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log('token', tokens);
    var opts = {
        hostname: 'sheets.googleapis.com',
        port: 443,
        path: `/v4/spreadsheets/${SHEET_ID}/values/mealsheet`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokens.access_token}`
        }
    };
    console.log('here 2');
    var req = https.request(opts, (res) => {
        console.log('here 3');
        var store = '';
        res.on('data', (chunk) => store = store + chunk);
        res.on('end', () => accessextractdata.extractdata(store));
    });
    req.end();
});
