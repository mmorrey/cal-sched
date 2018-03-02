'use strict';
var moment = require('moment');

/**
 * Convert LaterJS schedule into Calendar recurrence string
 * @param {object} schedule
 * @param {string} locale
 * @return {string}
 */

var timeUnits = {'s':1,'m':2,'h':3,'d':4,'dw':4,'dc':4,'dy':4,'wy':5,'wm':5,'m':6,'y':7};

//let timeUnitArr = [['s',1], ['m',2],['h',3],['d',4],['dw',4],['dc',4],['dy',4],['wy',5],['wm',5],['m',6],['y',7]];
//var timeUnitOrder = new Map(timeUnitArr);
var timeZone = "United Kingdom/London"; // DEFAULT

// RFC 5545 - https://tools.ietf.org/html/rfc5545
// freq = "SECONDLY" / "MINUTELY" / "HOURLY" / "DAILY" / "WEEKLY" / "MONTHLY" / "YEARLY"
// recur-rule-part = ( "FREQ" "=" freq ) / ( "UNTIL" "=" enddate ) / ( "COUNT" "=" 1*DIGIT ) / ( "INTERVAL" "=" 1*DIGIT )
// ( "BYSECOND" "=" byseclist ) / ( "BYMINUTE" "=" byminlist ) / ( "BYHOUR" "=" byhrlist ) / ( "BYDAY" "=" bywentryList ) 
// / ( "BYMONTHDAY" "=" bymoentryList ) / ( "BYYEARDAY" "=" byyrentryList ) / ( "BYWEEKNO" "=" bywknolist ) / ( "BYMONTH" "=" bymolist )
// / ( "BYSETPOS" "=" bysplist ) / ( "WKST" "=" weekday )
// weekday     = "SU" / "MO" / "TU" / "WE" / "TH" / "FR" / "SA"

// ToDo - generalise to secondly, minutely....monthly, yearly



module.exports = {

    recurrence: function(schedule) {

        // ToDo - handle weekly recurrence in proper later.js object, see https://github.com/bunkat/later/issues/33#issuecomment-30369860 
 
        if (typeof schedule === 'object') {  // ToDo more rigourous check needed here!
            
            // ToDo reduce schedule to max value of internval unit and sub-interval unit 
            // ToDo - map time unit to scale (see below), and set frequency and subfrequency to match max and next scale 
            var frequencyProperty = 'wy' // assuming 'WEEKLY';
            var subfrequencyProperty ='d';
            var frequencyScale = Object.keys(schedule).map(property2Scale).reduce(maxScale);
            console.log(frequencyScale);
            //var matchingUnits = timeUnitOrder.entries().filter();
            //frequencyProperty = Object.keys(schedule).filter();
            
            /*
            var matchingUnits = timeUnitOrder.entries().filter(function(n) {  // https://stackoverflow.com/questions/16227197/compute-intersection-of-two-arrays-in-javascript
                return Object.keys(schedule).indexOf(n) > -1;
            });
            */

            let frequencyArray = [['s',"SECONDLY"], ['m',"MINUTELY"],['h',"HOURLY"],['d',"DAILY"],['dw',"DAILY"],['dc',"DAILY"],['dy',"DAILY"],['wy',"WEEKLY"],['wm',"WEEKLY"],['m',"MONTHLY"],['y',"YEARLY"]]; 
            var frequencyMap = new Map(frequencyArray);
            
            var interval = 1;

            if (Array.isArray(schedule[frequencyProperty])) {  // interval

                var freq = frequencyMap.get(frequencyProperty);
                interval=schedule[frequencyProperty][0]; // ToDo - handle multiple entries

                if (Array.isArray(schedule[subfrequencyProperty])) { // sub-interval entries
                    let entryScale = 'BYDAY';
                    var entryListString = schedule['d'].map(day2string).join(","); // string of all days in week which recur https://codeburst.io/javascript-learn-to-chain-map-filter-and-reduce-acd2d0562cd4
                    var entryString = ';'+entryScale+'='+entryListString;
                }

                var recurrenceString = 'RRULE:FREQ=' + freq;
                if (interval > 1) {recurrenceString += ';INTERVAL='+interval};
                if (entryListString != '') {recurrenceString += entryString };

                return recurrenceString;

            }
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
        var newDate = moment(date);  // clone Moment object, to avoid mutability (reference) issues, https://momentjs.com/docs/#/parsing/moment-clone/
        var nWeeks = newDate.week();
        var nCycles = parseInt((nWeeks-1)/cycle); // whole number
        console.log(nWeeks,nCycles); 
        return newDate.subtract((nCycles*cycle),'weeks');
    }
};




var day2string = (day) => {
    var dayStrings = ["SU","MO","TU","WE","TH","FR","SA"];
    return dayStrings[day-1]; // later.js days are 1-7
}


var setTimeZone = (tz) => { 
    timeZone = tz;
}

var property2Scale = (property) => {
    //return timeUnitOrder.get(property);
    return timeUnits[property];
;}

var maxScale = (scale,max) => {
    return Math.max(scale,max);
}