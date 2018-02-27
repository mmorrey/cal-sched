'use strict';

/**
 * Convert LaterJS schedule into Calendar recurrence string
 * @param {number} number
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

module.exports = function(schedule) {
 
    if (typeof schedule === 'object') {

        //console.log(JSON.stringify(schedule));
        //console.log(typeof(schedule.w));  // "object" (not "array")

        let day2string = (day) => {
            var dayStrings = ["SU","MO","TU","WE","TH","FR","SA"];
            return dayStrings[day-1]; // later.js days are 1-7
        }
        
        var freq = '';
        var byDayString = '';
        var interval = 1;

        if (Array.isArray(schedule.d)) {  // 
            freq='DAILY';
            interval=schedule.d[0]; // ToDo - handle multiple week entries
            byDayString = schedule.d.map(day2string).join(","); // https://codeburst.io/javascript-learn-to-chain-map-filter-and-reduce-acd2d0562cd4
        }

        if (Array.isArray(schedule.w)) {
            freq='WEEKLY';
            interval=schedule.w[0]; // ToDo - handle multiple week entries
        }

        var recurrenceString = 'RRULE:FREQ=' + freq;
        if (interval > 1) {recurrenceString += ';INTERVAL='+interval};
        if (byDayString != '') {recurrenceString += ';BYDAY='+byDayString};

        //var recurrenceString ='RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=MO,TH';
        return recurrenceString;
    }

};

