// Sample node.js web app for Pluralsight Docker CI course
// For demonstration purposes only
'use strict';

var express = require('express'),
    app = express();

var os = require("os");
var hostname = os.hostname();

app.set('views', 'views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('home', {
  });
});

app.get('/hostname', function(req, res) {
    res.send("HOSTNAME:"+hostname);
});

app.listen(3000);
module.exports.getApp = app;
