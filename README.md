# GTHB

A barebones, lightly opinionated wrapper around the Github API.

[![wercker status](https://app.wercker.com/status/fa3323e1cf77faa74168064379591a6d/s/master "wercker status")](https://app.wercker.com/project/bykey/fa3323e1cf77faa74168064379591a6d) [![NPM](https://nodei.co/npm/gthb.png?mini=true)](https://nodei.co/npm/gthb/)

```javascript
var GTHB = require('gthb');

var client = new GTHB({
  token: process.env.GITHUB_TOKEN || 'XXXXXXXXXXXX'
});

client.get('user/repos', {type: 'owner'}, function(error, data){
  if(error) throw new Error(error);
  console.log(data); // All of my repos!
});
```

## Installation

`npm install gthb`


## Quick Start

Currently, this library [only supports token authentication](https://github.com/desmondmorris/gthb/issues/1).  You can generate a
one [here](https://github.com/settings/applications/).  Do not forgot to adjust
your permissions appropriately.

```javascript
var GTHB = require('gthb');

var client = new GTHB({
  token: ''
});
```

Add your credentials accordingly.  I would use environment variables to keep your
 private info safe.  So something like:

```javascript
var client = new GTHB({
  token: process.env.GITHUB_TOKEN
});
```

You now have the ability to make GET and POST requests against the API via
the convenience methods.

```javascript
client.get(path, params, callback);
client.post(path, params, callback);
client.put(path, params, callback);
client.patch(path, params, callback);
client.delete(path, params, callback);
client.head(path, params, callback);
```

## Usage

You simply need to pass the path and parameters to one of convenience methods.
Take a look at the [documentation site](https://developer.github.com/v3/) to
reference available endpoints.

Example, lets get a [list of followers](https://developer.github.com/v3/users/followers/#list-followers-of-a-user):

```javascript
client.get('user/followers', function(error, data, response){
  if(error) throw new Error(error);
  console.log(data);  // List of followers
  console.log(response);  // Raw response object.
});
```

How about we [create a new repo](https://developer.github.com/v3/repos/#create)?:

```javascript
client.post('user/repos', {name: 'my-new-repo'},  function(error, data, response){
  if(error) throw error;
  console.log(data);  // New repository data.
  console.log(response);  // Raw response object.
});
```

## LICENSE

gthb: Copyright (c) 2015 Desmond Morris

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
