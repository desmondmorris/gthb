'use strict';

var extend = require('deep-extend');
var request = require('request');
var url = require('url');

var VERSION = require('../package.json').version;

var GTHB = function(options) {
  if (!(this instanceof GTHB)) return new GTHB(options);

  this.VERSION = VERSION;

  // Default configuration options
  var defaults = {
    endpoint: 'https://api.github.com',
    headers: {
      'User-Agent': 'GTHB/' + VERSION,
      Accept: 'application/vnd.github.v3+json'
    }
  };

  // Combine with options passed to constructor
  this.options = extend(defaults, options);

  // Build a request object
  this._request = request.defaults({
    headers: this.options.headers
  });
};

GTHB.prototype.request = function(method, path, params, callback) {
  // Set the callback if no params are passed
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  // Build the options to pass to our custom request object
  var options = {
    method: method.toLowerCase(),
    url: url.resolve(this.options.endpoint, url.parse(path).pathname)
  };

  // Pass url parameters if get
  if (options.method === 'get') {
    options.qs = params;
  }
  else {
    options.form = params;
  }

  // Authentication
  // @todo make this support the other auth methods
  if (typeof this.options.token !== 'undefined') {
    options.headers = {
      Authorization: 'token ' + this.options.token
    };
  }

  this._request(options, function(error, response, data){
    if (error) {
      callback(error, data, response);
    }
    else {
      try {
        data = JSON.parse(data);
        callback(null, data, response);
      }
      catch(parseError) {
        callback(
          new Error('Code: ' + response.statusCode),
          data,
          response
        );
      }
    }
  });
};

// Helper instance methods for get, post, patch and delete
var methods = ['get', 'delete', 'head', 'patch', 'post', 'put', 'delete'];
methods.forEach(function(method){
  GTHB.prototype[method] = function(path, params, callback) {
    this.request(method, path, params, callback);
  };
});

module.exports = GTHB;
