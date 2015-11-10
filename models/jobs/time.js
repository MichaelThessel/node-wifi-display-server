var Job = require('./job.js');

/**
 * Displays current time and date
 */
function Time() {
    this.priority = 'INFO';
    this.hasData = true;
    this.formatterOptions = ['center', 'center'];
}

Time.prototype = new Job();

Time.prototype.getData = function (callback, display) {
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),

    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    this.data = [
        year + '/' + month + '/' + day,
        hours + ':' + minutes,
    ];

    callback(this);
}

module.exports = new Time();
