'use strict';
var moment = require('moment');

/**
 * Convert LaterJS schedule into Calendar recurrence string
 * @param {object} schedule
 * @param {string} locale
 * @return {string}
 */

// RFC 5545 - https://tools.ietf.org/html/rfc5545
// freq = "SECONDLY" / "MINUTELY" / "HOURLY" / "DAILY" / "WEEKLY" / "MONTHLY" / "YEARLY"
// recur-rule-part = ( "FREQ" "=" freq ) / ( "UNTIL" "=" enddate ) / ( "COUNT" "=" 1*DIGIT ) / ( "INTERVAL" "=" 1*DIGIT )
// ( "BYSECOND" "=" byseclist ) / ( "BYMINUTE" "=" byminlist ) / ( "BYHOUR" "=" byhrlist ) / ( "BYDAY" "=" bywdaylist ) 
// / ( "BYMONTHDAY" "=" bymodaylist ) / ( "BYYEARDAY" "=" byyrdaylist ) / ( "BYWEEKNO" "=" bywknolist ) / ( "BYMONTH" "=" bymolist )
// / ( "BYSETPOS" "=" bysplist ) / ( "WKST" "=" weekday )
// weekday     = "SU" / "MO" / "TU" / "WE" / "TH" / "FR" / "SA"

// ToDo - generalise to secondly, minutely....monthly, yearly

var timeZone = "United Kingdom/London"; // DEFAULT

module.exports = {

    recurrence: function(schedule) {
 
        if (typeof schedule === 'object') {

            let day2string = (day) => {
                var dayStrings = ["SU","MO","TU","WE","TH","FR","SA"];
                return dayStrings[day-1]; // later.js days are 1-7
            }
            
            var freq = '';
            var byDayString = '';
            var interval = 1;

            if (Array.isArray(schedule.d)) {  // 
                freq='DAILY';
                interval=schedule.d[0]; // ToDo - handle multiple day entries
                byDayString = schedule.d.map(day2string).join(","); // https://codeburst.io/javascript-learn-to-chain-map-filter-and-reduce-acd2d0562cd4
            }

            if (Array.isArray(schedule.wy)) {
                freq='WEEKLY';
                interval=schedule.wy[0]; // ToDo - handle multiple week entries
            }

            var recurrenceString = 'RRULE:FREQ=' + freq;
            if (interval > 1) {recurrenceString += ';INTERVAL='+interval};
            if (byDayString != '') {recurrenceString += ';BYDAY='+byDayString};

            //var recurrenceString ='RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=MO,TH';
            return recurrenceString;
        }

    }

    ,createEvent: function(start,duration,summary){
        let event = new Object();
        event.summary=summary;
        event.start = {"dateTime":start.toISOString(),"timeZone":timeZone};
        event.end = {
            "dateTime":start.add(duration, 'hours').toISOString()
            ,"timeZone":timeZone};
        return event;
    }

    ,firstWeekDate: function(date,cycle) {
        var nWeeks = date.week();
        var nCycles = parseInt((nWeeks-1)/cycle); // whole number
        return date.subtract((nCycles*cycle),'weeks');
    }
};



function getFrequency (schedule) {
     /  /  / "DAILY" / "WEEKLY" / "MONTHLY" / "YEARLY"
    let orderArr = [['s',1], ['m',2],['h',3],['d',4],['dw',4],['dc',4],['dy',4],['wy',5],['wm',5],['m',6],['y',7]];
    let order = new Map(orderArr);
    //let freqArr = [['s',"SECONDLY"], ['m',"MINUTELY"],['h',"HOURLY"],['d',4],['dw',4],['dc',4],['dy',4],['wy',5],['wm',5],['m',6],['y',7]];
    //let frequency = new Map(frequncyArr);
}

var setTimeZone = (tz) => { 
    timeZone = tz;
}