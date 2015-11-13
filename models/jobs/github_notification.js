var Job = require('./job.js');
var config = require('../../config.js');
var request = require('request');

/**
 * Checks GitHub notifications
 */
function GithubNotification() {
    this.priority = 'NOTICE';
    this.hasData = false;
}

GithubNotification.prototype = new Job();

GithubNotification.prototype.getData = function () {
    var url = 'https://api.github.com/notifications?access_token='
        + config.jobs.githubNotification.accessToken;

    var _this = this;
    this.hasData = false;
    request({
        url: url,
        headers: {
            'User-Agent': 'Wifi Display Server'
        }
    }, function (error, response, body) {
        if (error || response.statusCode != 200) { return; }

        var response = JSON.parse(body),
            unreadCount = 0;

        // Got messages
        if (!response.length) { return; }

        // Check for unread messages
        for (var i = 0; i < response.length; i++) {
            if (response[i].unread) { unreadCount++; }
        }

        if (unreadCount) {
            _this.data = [
                'GitHub',
                'Messages: ' + unreadCount,
            ]
            _this.hasData = true;
        }

        _this.callback(_this);
    });
}

module.exports = new GithubNotification();
