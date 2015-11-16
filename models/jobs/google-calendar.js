var Job = require('./job.js');
var googleOauth2 = require('../google-oauth2.js');
var google = require('googleapis');

/**
 * Displays the next calendar event
 */
function GoogleCalendar() {
    this.priority = 'INFO';
    this.hasData = false;
}

GoogleCalendar.prototype = new Job();

GoogleCalendar.prototype.getNextEvent = function(auth) {
    var calendar = google.calendar('v3'),
        options = {
            auth: auth,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 1,
            singleEvents: true,
            orderBy: 'startTime'
        };

    var _this = this;
    calendar.events.list(options, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }

        var events = response.items;
        if (events.length == 0) { return; }

        var time = events[0].start.dateTime;
        var date = events[0].start.date;
        var summary = events[0].summary;

        if (time) {
            time = time.replace(/-/g, '/');
            time = time.replace(/T/g, ' ');
        }

        if (date) {
            date = date.replace(/-/g, '/');
        }

        _this.data = [
            time || date,
            summary
        ];
        _this.hasData = true;
        _this.callback(_this);
    });
}

GoogleCalendar.prototype.getData = function () {
    googleOauth2.execute(this.getNextEvent.bind(this));
}

module.exports = new GoogleCalendar();
