var Job = require('./job.js');
var config = require('../../config.js');
var googleOauth2 = require('../google-oauth2.js');
var google = require('googleapis');

/**
 * Displays the GMail unread count
 */
function GoogleMail() {
    this.priority = 'NOTICE';
    this.hasData = false;
}

GoogleMail.prototype = new Job();

GoogleMail.prototype.getUnreadMessages = function(auth) {
    var gmail = google.gmail('v1'),
        options = {
            "auth": auth,
            "userId": "me",
            "q": "is:unread is:inbox",
        };

    var _this = this;
    gmail.users.messages.list(options, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }

        if (response.resultSizeEstimate == 0) { return; }

        _this.data = [
            'GMail Messages: ',
            response.resultSizeEstimate
        ];
        _this.hasData = true;
        _this.callback(_this);
    });
}

GoogleMail.prototype.getData = function () {
    googleOauth2.execute(this.getUnreadMessages.bind(this));
}

module.exports = new GoogleMail();
