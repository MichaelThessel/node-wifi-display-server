var Job = require('./job.js');
var fs = require("fs");
var config = require("../../config.js");

/**
 * Displays current network interface traffic
 */
function NetworkTraffic() {
    this.priority = 'INFO';
    this.hasData = true;

    this.traffic = {
        "rx": 0,
        "tx": 0,
        "drx": 0,
        "dtx": 0,
    }
}

NetworkTraffic.prototype = new Job();

/*
 * Track network traffic
 */
NetworkTraffic.prototype.trackTraffic = function() {
    var _this = this;
    setInterval(function() {
        var rx, tx;

        rx = fs.readFileSync('/sys/class/net/' + config.jobs.networkTraffic.interface + '/statistics/rx_bytes').toString();
        tx = fs.readFileSync('/sys/class/net/' + config.jobs.networkTraffic.interface + '/statistics/tx_bytes').toString();

        // Delta in byte / s (log every 1s)
        _this.traffic.drx = (rx - _this.traffic.rx);
        _this.traffic.dtx = (tx - _this.traffic.tx);

        // Save
        _this.traffic.rx = rx;
        _this.traffic.tx = tx;

    }, 1000);
}

/*
 * Format traffic data
 */
NetworkTraffic.prototype.format = function(data) {
    var suffix = '';

    if (data > 1000 * 1000) {
        data = data / 1000 / 1000;
        suffix = 'MB/s';
    } else if (data > 1000) {
        data = data / 1000;
        suffix = 'kB/s';
    } else {
        suffix = 'B/s';
    }

    data = Math.round(data);

    return data + suffix;
}

/*
 * Get formatted traffic data
 */
NetworkTraffic.prototype.getData = function (callback) {
    this.data = [
        'RX: ' + this.format(this.traffic.drx),
        'TX: ' + this.format(this.traffic.dtx),
    ];

    callback(this);
}

var nwt = new NetworkTraffic();
nwt.trackTraffic();

module.exports = nwt;
