/* global describe, it */

var expect = require('chai').expect
var calSched = require('./index')

describe('cal sched', function () {
  it('should export a function', function () {
    expect(calSched).to.be.a('function')
  })
})
