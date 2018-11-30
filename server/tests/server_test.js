const supertest = require('supertest');
const express = require('mocha');
const chai = require('chai');
var mongoose = require('mongoose');
var assert = require('assert');

var app = require('../index.js');

global.app = app;  
global.expect = chai.expect;  
global.request = supertest(app); 

var token = null;



describe('Testing API Routes', function() {
	
    // This function will run before every test to clear database
	function clearCollections() {
/*     for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].remove(function() {});
    } */
		if(mongoose.connection.collections["User"]){
			mongoose.connection.collections["User"].remove(function() {})
		}
	
  }
    before(function(done) {
		if (mongoose.connection.readyState === 0) {
			 mongoose.connect(`mongodb://${db_creds.username}:${db_creds.password}@ds131763.mlab.com:31763/stk_db`, function (err) {
			  if (err) throw err;
			  clearCollections();
			  mongoose.disconnect();
			  done();
			});
		  } else {
			clearCollections();
			done();
		  }
	});
	

	describe('GET /user/ (Not Logged In)', function() {
        it('/user/ returns unauthorized when not logged in', function(done) {
            request.get('/user/stocks')
                .expect(401)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
                    done();
                });
        });
    });
	
	describe('GET /user/stocks (Not Logged In)', function() {
        it('/user/stocks/ returns unauthorized when not logged in', function(done) {
            request.get('/user/stocks')
                .expect(401)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
                    done();
                });
        });
	});
		
	describe('POST /auth/signup', function() {
        it('Returns 200 When Adding User', function(done) {
            request.post('/auth/signup')
				.send({
					email: "test@test.com",
					password: "test",
					firstName: "test",
					lastName: "test"
				})
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
                    done();
                });
        });
		
		it('Returns Error when Adding Already Used Email', function(done) {
            request.post('/auth/signup')
				.send({
					email: "test@test.com",
					password: "test",
					firstName: "test",
					lastName: "test"
				})
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.error);
                    done();
                });
        });
		
		it('Returns error when adding user with incorrect data', function(done) {
            request.post('/auth/signup')
				.send({
				})
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.error);
                    done();
                });
        });
    });
	
	describe('POST /auth/login', function() {
        it('Returns 200 and auth-token When Logging In', function(done) {
            request.post('/auth/login')
				.send({
					email: "test@test.com",
					password: "test"
				})
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.auth-token);
					token = res.body['auth-token'];
					console.log(token);
                    done();
                });
        });
		
		it('Returns error message for incorect login', function(done) {
            request.post('/auth/login')
				.send({
					email: "bobo@test.com",
					password: "bobo"
				})
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.error);
                    done();
                });
        });
    });
	
	describe('GET /user', function() {
        it('Returns 200 and correct user object', function(done) {
            request.get('/user')
				.set('authorization', 'Bearer ' + token)
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.id);
					expect(res.body.email);
					expect(res.body.password);
					expect(res.body.firstName);
					expect(res.body.lastName);
                    done();
                });
        });
		
		it('Incorrect token returns 401', function(done) {
            request.get('/user')
				.set('authorization', 'Bearer ' + '123')
                .expect(401)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
                    done();
                });
        });
	});
	
	describe('POST /user/stocks/add/', function() {
        it('Returns 200 and updated object When Adding Stock to User Portfolio', function(done) {
            request.post('/user/stocks/add/GOOGL')
				.set('authorization', 'Bearer ' + token)
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
                    done();
                });
        });
		
		it('Returns error if stock already in portfolio', function(done) {
            request.post('/user/stocks/add/GOOGL')
				.set('authorization', 'Bearer ' + token)
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.error);
                    done();
                });
        });
		
		it('Returns error if added stock does not exist', function(done) {
            request.post('/user/stocks/add/dd')
				.set('authorization', 'Bearer ' + token)
                .expect(404)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.error);
                    done();
                });
        });
		
    });
	
	describe('GET /user', function() {
        it('Returns added correct stock', function(done) {
            request.get('/user')
				.set('authorization', 'Bearer ' + token)
                .expect(200)
                .end(function(err, res) {				
					if(err){
						return done(err);
					}
					assert(res.body.stocks[0].tickerSymbol, 'GOOGL');
                    done();
                });
        });
		
	});
	
	describe('POST /user/stocks/delete/', function() {
        it('Returns 200 and updated object When Deleting Stock From User Portfolio', function(done) {
            request.post('/user/stocks/delete/GOOGL')
				.set('authorization', 'Bearer ' + token)
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
                    done();
                });
        });
		
		it('Returns error if deleting stock not in portfolio', function(done) {
            request.post('/user/stocks/add/GOOGL')
				.set('authorization', 'Bearer ' + token)
                .expect(200)
                .end(function(err, res) {
					if(err){
						return done(err);
					}
					expect(res.body.error);
                    done();
                });
        });
		
    });
	
	describe('GET /user', function() {
        it('User profile has 0 stocks after deleting stock', function(done) {
            request.get('/user')
				.set('authorization', 'Bearer ' + token)
                .expect(200)
                .end(function(err, res) {				
					if(err){
						return done(err);
					}
					assert(res.body.stocks.length, 0);
                    done();
                });
        });
		
	});
   
});