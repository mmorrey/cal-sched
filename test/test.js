'use strict';

var expect = require('chai').expect;
var moment = require('moment');
var calSched = require('../index');




describe('#calSched', function() {


    // First Week, 1 week cycle

    var aWednesday = moment('2018-02-28T07:00');  // A Wednesday

    it('firstWeekDate day should be a Wednesday', function() {
        var result = calSched.firstWeekDate(aWednesday,1);
        expect(result.isoWeekday()).to.equal(3)
    });

    it('firstWeekDate year should be 2018', function() {
        var result = calSched.firstWeekDate(aWednesday,1);
        expect(result.year()).to.equal(2018);
    });

    it('firstWeekDate ISO week should be 1', function() {
        var result = calSched.firstWeekDate(aWednesday,1);
        expect(result.isoWeek()).to.equal(1);
    });

    // First Week, 2 week cycle

    var thurW6 = moment('2018-02-08T07:00');  // Thursday, week 6

    it('firstWeekDate day should be a Thursday', function() {
        var result = calSched.firstWeekDate(thurW6,2);
        expect(result.isoWeekday()).to.equal(4)
    });

    it('firstWeekDate year should be 2018', function() {
        var result = calSched.firstWeekDate(thurW6,2);
        expect(result.year()).to.equal(2018);
    });

    it('firstWeekDate ISO week should be 2', function() {
        var result = calSched.firstWeekDate(thurW6,2);
        expect(result.isoWeek()).to.equal(2);
    });

    
    
    
    // convert Moment date into GCal Event

    var event1 = {
        "summary": "Appointment",
        "start": {
          "dateTime": "2018-01-03T07:00:00.000Z",
          "timeZone": "United Kingdom/London"
        },
        "end": {
          "dateTime": "2018-01-03T08:00:00.000Z",
          "timeZone": "United Kingdom/London"
        }
        //,"recurrence": ["RRULE:FREQ=WEEKLY;UNTIL=20181231T170000Z"]
    }

    it('should create 1 hour event object', function() {
        var result = calSched.createEvent(moment('2018-01-03T07:00:00'),1,'Appointment');
        expect(JSON.stringify(result)).to.equal(JSON.stringify(event1));
    });


    // NUMBER OF WEEKS, SINGLE-DAY

    it('should convert weekly recurrence', function() {
        var result = calSched.recurrence({wy:[1],d:[3]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;BYDAY=TU');
    });

    it('should convert bi-weekly recurrence', function() {
        var result = calSched.recurrence({wy:[2],d:[2]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO');
    });

    it('should convert tri-weekly recurrence', function() {
        var result = calSched.recurrence({wy:[3],d:[5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=TH');
    });

    it('should convert four-weekly recurrence', function() {
        var result = calSched.recurrence({wy:[4],d:[4]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=WE');
    });


    // NUMBER OF WEEKS, MULTI-DAY

    it('should convert weekly multi-day recurrence', function() {
        var result = calSched.recurrence({wy:[1],d:[4,6]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;BYDAY=WE,FR');
    });

    it('should convert bi-weekly multi-day recurrence', function() {
        var result = calSched.recurrence({wy:[2],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,TH');
    });

    it('should convert tri-weekly multi-day recurrence', function() {
        var result = calSched.recurrence({wy:[3],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=MO,TH');
    });

    it('should convert four-weekly multi-day recurrence', function() {
        var result = calSched.recurrence({wy:[4],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=MO,TH');
    });

});