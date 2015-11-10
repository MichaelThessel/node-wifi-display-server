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
    var date = new Date();

    this.data = [
        date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    ];

    callback(this);
}

module.exports = new Time();
