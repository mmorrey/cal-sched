'use strict';

/**
 * Convert LaterJS schedule into Calendar recurrence string
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
module.exports = function(schedule) {
    var recurrenceString ='RRULE:FREQ=WEEKLY;INTERVAL=4;BYDAY=MO,TH';
    return recurrenceString;
};

