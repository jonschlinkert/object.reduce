/*!
 * object.reduce <https://github.com/jonschlinkert/object.reduce>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var reduce = require('./');

describe('.reduce()', function() {
  it('should use an initializer for the accumulator', function() {
    var a = {a: 'foo', b: 'bar', c: {}};
    var init = {};

    reduce(a, function(acc, value, key, orig) {
      if (typeof value === 'object') {
        acc[key] = {what: 'who?'};
      } else {
        acc[key] = value.toUpperCase();
      }
      return acc;
    }, init);

    assert.deepEqual(init, {a: 'FOO', b: 'BAR', c: {what: 'who?'}});
  });

  it('should take a context as the last argument', function() {
    var a = {a: 'foo', b: 'bar', c: {}};
    var ctx = {a: 'x', b: 'y', c: 'z'};
    var init = {};

    reduce(a, function(acc, value, key, orig) {
      acc[key] = this[key];
      return acc;
    }, init, ctx);

    assert.deepEqual(init, {a: 'x', b: 'y', c: 'z'});
  });

  it('should run each property in the obj through the callback.', function() {
    var a = {a: 'foo', b: 'bar', c: {}};
    var obj = reduce(a, function(acc, value, key, orig) {
      if (typeof value === 'object') {
        acc[key] = {what: 'who?'};
      } else {
        acc[key] = value.toUpperCase();
      }
      return acc;
    }, {});

    assert.deepEqual(obj, {a: 'FOO', b: 'BAR', c: {what: 'who?'}});
  });
});
