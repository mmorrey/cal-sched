'use strict';

var expect = require('chai').expect;
var calSched = require('../index');

describe('#calSched', function() {


    // NUMBER OF WEEKS, SINGLE-DAY

    it('should convert weekly recurrence', function() {
        var result = calSched({wy:[1],d:[3]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;BYDAY=TU');
    });

    it('should convert bi-weekly recurrence', function() {
        var result = calSched({wy:[2],d:[2]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO');
    });

    it('should convert tri-weekly recurrence', function() {
        var result = calSched({wy:[3],d:[5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=TH');
    });

    it('should convert four-weekly recurrence', function() {
        var result = calSched({wy:[4],d:[4]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=WE');
    });


    // NUMBER OF WEEKS, MULTI-DAY

    it('should convert weekly multi-day recurrence', function() {
        var result = calSched({wy:[1],d:[4,6]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;BYDAY=WE,FR');
    });

    it('should convert bi-weekly multi-day recurrence', function() {
        var result = calSched({wy:[2],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,TH');
    });

    it('should convert tri-weekly multi-day recurrence', function() {
        var result = calSched({wy:[3],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=MO,TH');
    });

    it('should convert four-weekly multi-day recurrence', function() {
        var result = calSched({wy:[4],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=MO,TH');
    });

});