'use strict';

var GTHB = require('../');

var client = new GTHB({
  token: process.env.GITHUB_TOKEN || 'XXXXXXXXXXXX'
});

// Make a get request against the /users endpoint and pass a `since` parameter
client.get('users', {since: 135}, function(error, data){
  if(error) throw new Error(error);
  console.log(data);
});
