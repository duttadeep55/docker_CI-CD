// Simple async test for HTTP 200 response code using supertest
'use strict';

var request = require("supertest"),
    app = require("../router").getApp;

describe('GET /', function(){
  it('expects HTTP response 200', function(done){
    request(router)
     .get('/')
	 .expect(200, done); 
  });
});
