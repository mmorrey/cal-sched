'use strict';

var expect = require('chai').expect;
var moment = require('moment');
var weekness = require('../index');


describe('#weekness', function() {

    // ********************************
    // FUNCTION: firstWeekDate

    // 1 week cycle, starting week 9

    var wedW9 = moment('2018-02-28T07:00');  // A Wednesday
    var resultW9 = weekness.firstWeekDate(wedW9,1);

    it('firstWeekDate day should be a Wednesday', function() {
        expect(resultW9.isoWeekday()).to.equal(3);
    });

    it('firstWeekDate year should be 2018', function() {
        expect(resultW9.year()).to.equal(2018);
    });

    it('firstWeekDate ISO week should be 1', function() {
        expect(resultW9.isoWeek()).to.equal(1);
    });

    // 2 week cycle, starting week 2

    var thurW6 = moment('2018-02-08T07:00');  // Thursday, week 6
    var resultW6 = weekness.firstWeekDate(thurW6,2);

    it('firstWeekDate day should be a Thursday', function() {
        expect(resultW6.isoWeekday()).to.equal(4);
    });

    it('firstWeekDate year should be 2018', function() {
        expect(resultW6.year()).to.equal(2018);
    });

    it('firstWeekDate ISO week should be 2', function() {
        expect(resultW6.isoWeek()).to.equal(2);
    });

    // 3 week cycle, starting week 3

    var monW42 = moment('2018-10-15T07:00');  // Monday, week 42
    var resultW42 = weekness.firstWeekDate(monW42,3);

    it('w42 firstWeekDate day should be a Monday', function() {
        expect(resultW42.isoWeekday()).to.equal(1);
    });

    it('w42 firstWeekDate year should be 2018', function() {
        expect(resultW42.year()).to.equal(2018);
    });

    it('w42 firstWeekDate ISO week should be 3', function() {
        expect(resultW42.isoWeek()).to.equal(3);
    });

    // 3 week cycle, starting week 1
    var monW43 = moment('2018-10-22T07:00');  // Monday, week 43   
    var resultW43 = weekness.firstWeekDate(monW43,3);

    it('w43 firstWeekDate day should be a Monday', function() {
        expect(resultW43.isoWeekday()).to.equal(1);
    });

    it('w43 firstWeekDate year should be 2018', function() {
        var result = weekness.firstWeekDate(monW43,3);
        expect(resultW43.year()).to.equal(2018);
    });

    it('w43 firstWeekDate ISO week should be 1', function() {
        var result = weekness.firstWeekDate(monW43,3);
        expect(resultW43.isoWeek()).to.equal(1);
    });

    // 4 week cycle, starting week 51
    var tueW51 = moment('2018-12-18T07:00');  // Tuesday, week 51
    var resultW51 = weekness.firstWeekDate(tueW51,3);

    it('w43 firstWeekDate day should be a Monday', function() {
        expect(resultW51.isoWeekday()).to.equal(2);
    });

    it('w43 firstWeekDate year should be 2018', function() {
        var result = weekness.firstWeekDate(monW43,3);
        expect(resultW51.year()).to.equal(2018);
    });

    it('w43 firstWeekDate ISO week should be 1', function() {
        var result = weekness.firstWeekDate(monW43,3);
        expect(resultW51.isoWeek()).to.equal(3);
    });


    // ********************************    
    // FUNCTION: createEvent
    // converts Moment date into GCal Event

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
        var result = weekness.createEvent(moment('2018-01-03T07:00:00'),1,'Appointment');
        expect(JSON.stringify(result)).to.equal(JSON.stringify(event1));
    });

    // ********************************
    // FUNCTION: recurrence
    // Weekly recurrence string from Later.js style object

    // NUMBER OF WEEKS, SINGLE-DAY

    it('should convert weekly recurrence', function() {
        var result = weekness.recurrence({wy:[1],d:[3]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;BYDAY=TU');
    });

    it('should convert bi-weekly recurrence', function() {
        var result = weekness.recurrence({wy:[2],d:[2]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO');
    });

    it('should convert tri-weekly recurrence', function() {
        var result = weekness.recurrence({wy:[3],d:[5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=TH');
    });

    it('should convert four-weekly recurrence', function() {
        var result = weekness.recurrence({wy:[4],d:[4]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=WE');
    });


    // NUMBER OF WEEKS, MULTI-DAY

    it('should convert weekly multi-day recurrence', function() {
        var result = weekness.recurrence({wy:[1],d:[4,6]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;BYDAY=WE,FR');
    });

    it('should convert bi-weekly multi-day recurrence', function() {
        var result = weekness.recurrence({wy:[2],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,TH');
    });

    it('should convert tri-weekly multi-day recurrence', function() {
        var result = weekness.recurrence({wy:[3],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=MO,TH');
    });

    it('should convert four-weekly multi-day recurrence', function() {
        var result = weekness.recurrence({wy:[4],d:[2,5]});
        expect(result).to.equal('RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=MO,TH');
    });

});