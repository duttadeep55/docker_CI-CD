// Sample node.js web app for Pluralsight Docker CI course
// For demonstration purposes only
'use strict';

var express = require('express'),
    app = express();

var os = require("os");
var hostname = os.hostname();
var router = express.Router();

require('./monitoring.js')(router);

app.set('views', 'views');
app.set('view engine', 'jade');



router.get('/', function(req, res) {
    res.render('home', {
  });
});

router.get('/hostname', function(req, res) {
    res.send("HOSTNAME:"+hostname);
});

app.use(router);

app.listen(3000);

module.exports.getApp = router;
