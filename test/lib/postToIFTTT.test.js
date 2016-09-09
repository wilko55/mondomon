var assert = require('assert');
const sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var postToIFTTT = require('../../lib/postToIFTTT')
var stubEncrypt = sinon.stub.resolves({});

describe('The post to IFTTT function', function() {
  it('should have a key and a message', function() {
    var actualResult = postToIFTTT.post()
  })
})