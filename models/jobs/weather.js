var Job = require('./job.js');
var config = require('../../config.js');
var request = require('request');

/**
 * Displays current weather information
 */
function Weather() {
    this.priority = 'INFO';
    this.hasData = true;

    this.cacheExpiry = 0;
}

Weather.prototype = new Job();

Weather.prototype.getData = function (callback) {
    var url = 'https://api.forecast.io/forecast/'
        +  config.jobs.weather.apiKey + '/'
        +  config.jobs.weather.latitude + ','
        +  config.jobs.weather.longitude;

    if (Date.now < this.cacheExpiry) {
        callback(this);
        return;
    }

    var _this = this;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var current = JSON.parse(body).currently;
        _this.data = [
            'Temp: ' + Math.round((current.temperature - 32) * 5 / 9) + 'C',
            'Percip: ' + Math.round(current.precipProbability * 100) + '%',
        ];

        // Fetch every 2 minutes, forecast.io has a daily limit of 1000 requests
        _this.cacheExpiry = Date.now + 60 * 2 * 1000;

        callback(_this);
      }
    });
}

module.exports = new Weather();
