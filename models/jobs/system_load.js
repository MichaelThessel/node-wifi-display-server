var Job = require('./job.js');
var fs = require("fs");

/**
 * Displays current system load
 */
function SystemLoad() {
    this.priority = 'INFO';
    this.hasData = true;
}

SystemLoad.prototype = new Job();

SystemLoad.prototype.getData = function () {
    var data = fs.readFileSync('/proc/loadavg').toString();

    data = data.split(' ');
    this.data = [
        'System Load:',
        data[0] + ' '+ data[1] + ' ' + data[2],
    ];

    this.callback(this);
}

module.exports = new SystemLoad();
