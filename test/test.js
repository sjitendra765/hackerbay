//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block

let jsonpatch = require('jsonpatch')
let multer = require('multer');
let crypto = require('crypto');
let gm = require('gm').subClass({imageMagick: true});
let fs = require('fs')
let token =''

describe('/POST login', () => {
      it('it should POST  without username and password', (done) => {
        let loginInfo = {
            username: "jiten",
            password: "singh"
        }
        chai.request(server)
            .post('/login')
            .send(loginInfo)
            .end((err, res) => {
            	token = res.body.token
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });

  });


describe('/POST jsonpatch', () => {
      it('it should post json and patch and return the result json', (done) => {
        let jsonpatch = {
						  "mydoc": {
								"foo":"goo",
								"doo": "noo"
						   },
						  "thepatch": {
						   	     "op": "replace",
						   	     "path": "/foo",
						   	     "value": "hgu"
						  }
						}
        chai.request(server)
            .post('/jsonpatch')
            .set({'Authorization': token})
            .send(jsonpatch)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });

  });


describe('upload', function() {
    it('a file', function(done) {
       chai.request(server)
       		  .post('/thumbnail')
              .set({'Authorization': token})
              .attach('file', './uploads/ntc.png')
              .end(function(err, res) {
                  res.should.have.status(200) // 'success' status
                  done()
              });
    });
});