/* global describe, it */

var expect = require('chai').expect
var weekness = require('./index')

describe('cal sched', function () {
  it('should export a function', function () {
    expect(weekness).to.be.a('function')
  })
})
