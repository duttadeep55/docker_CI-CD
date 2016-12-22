var onHeaders = require('on-headers');
var performanceNow = require("performance-now");
var blocked = require('blocked');
var express = require('express');
var router = express.Router();


module.exports = function(app){


function addPoweredBy() {
  // console.log(this.getHeader('X-Powered-By'));
  // set if not set by end of request 
  if (!this.getHeader('X-Powered-By')) {
    this.setHeader('X-Powered-By', 'Node.js')
  }
}

var setResponseTime = function(req,res,next){
      var dummy = 0;
      var start = performanceNow();
      onHeaders(res, addPoweredBy);
      var duration = performanceNow() - start;
    //   console.log("duration",duration);
    res.setHeader('X-Response-Time', duration + 'ms');
    addToRiemann('node_table',duration, {"originalUrl":req.originalUrl}, {"method":req.method}, ['nonblocking']);
    //  console.log(req.url +" took "+duration + "milliseconds" + " Status Code " + res.statusCode);
      next();
    };
app.use(setResponseTime);

var client = require('riemann').createClient({
  host: '52.18.92.162',
  port: 5555
});

client.on('connect', function() {
  console.log('connected!');
});

// app.use( blocked(function(ms){
//   addToRiemann('event_table', ms, {"OriginalUrl":null}, {"Method":null}, ['nonblocking']);  
// }));

var addToRiemann = function(serviceName ,metric, description, state, tags, namemy) {
   
//    console.log(serviceName +" : "+" : " + metric + description.originalUrl + " : "+tags + " : "+ state.method + ":" +namemy);
    client.send(client.Event({
        service: serviceName,
        metric:  metric,
        tags:    tags,
        description: description.originalUrl,
        state: state.method,
        host: namemy
    }));    
};

function errorHandler(err, req, res, next) {
  console.log("INFO: Inside error handler ");
  console.log("Object read",err);
  console.log("Status of request", res.statusCode);
  addToRiemann('node_table', 1 , {"originalUrl":req.originalUrl}, {"method":404},['error_prone']);
  console.log(req.method);
  res.status(err.status).send(err.message);
}
app.use(errorHandler);


}

