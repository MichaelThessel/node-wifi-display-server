var Job = require('./job.js');
var config = require('../../config.js');

/**
 * Praises
 */
function Gratificator() {
    this.priority = 'INFO';
    this.hasData = true;
    this.formatterOptions = ['center', 'center'];
}

Gratificator.prototype = new Job();

Gratificator.prototype.getData = function (callback) {
    var attributeIndex = Math.round(Math.random() * (config.jobs.gratificator.attributes.length - 1));

    this.data = [
        config.jobs.gratificator.name,
        config.jobs.gratificator.attributes[attributeIndex],
    ];

    callback(this);
}

module.exports = new Gratificator();
