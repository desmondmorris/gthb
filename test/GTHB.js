'use strict';

var assert = require('assert');
var nock = require('nock');
var GTHB = require('../');
var VERSION = require('../package.json').version;

describe('GTHB', function() {

  describe('Constructor', function() {

    describe('new GTHB();', function() {

      var defaults = {};

      before(function(){
        defaults = {
          endpoint: 'https://api.github.com',
          headers: {
            'User-Agent': 'GTHB/' + VERSION,
            Accept: 'application/vnd.github.v3+json'
          }
        };
      });

      it('create new instance', function(){
        var client = new GTHB();
        assert(client instanceof GTHB);
      });

      it('has default options', function(){
        var client = new GTHB();
        assert.equal(
          Object.keys(defaults).length,
          Object.keys(client.options).length
        );
        assert.deepEqual(
          Object.keys(defaults),
          Object.keys(client.options)
        );
      });

      it('accepts and overrides options', function(){
        var options = {
          token: 'XXXXX',
          endpoint: 'https://api5.github.com',
          headers: {
            'User-Agent': 'GTHB-TEST/' + VERSION,
          }
        };

        var client = new GTHB(options);

        assert(client.options.hasOwnProperty('token'));
        assert.equal(client.options.token, options.token);

        assert.equal(client.options.endpoint, options.endpoint);

        assert.equal(
          client.options.headers['User-Agent'],
          options.headers['User-Agent']);
      });

      it('has pre-configured request object', function(next){
        var client = new GTHB({
          headers: {
            'foo': 'bar',
          }
        });

        assert(client.hasOwnProperty('_request'));

        nock('https://api.github.com').get('/').reply(200);
        client._request.get('https://api.github.com/', function(error, response){

          var headers = response.request.headers;

          assert(headers.hasOwnProperty('foo'));
          assert(headers.foo, 'bar');

          assert.equal(headers['User-Agent'], 'GTHB/' + VERSION);
          assert(headers.hasOwnProperty('Accept'));
          assert.equal(headers.Accept, 'application/vnd.github.v3+json');

          next();
        });


      });
    });
  });
});
