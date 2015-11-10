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

Time.prototype.getData = function () {
    var date = new Date();

    this.data = [
        date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        date.getHours() + ':' + date.getMinutes()
    ];

    return this.data;
}

module.exports = new Time();
