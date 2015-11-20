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

Weather.prototype.getData = function () {
    var url = 'https://api.forecast.io/forecast/'
        +  config.jobs.weather.apiKey + '/'
        +  config.jobs.weather.latitude + ','
        +  config.jobs.weather.longitude;

    if (Date.now() < this.cacheExpiry) {
        this.callback(this);
        return;
    }

    var _this = this;
    this.hasData = false;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var response = JSON.parse(body),
                currently = response.currently,
                minutely = response.minutely,
                precip, temp, wind, humidity;

            // Get the temperature in celcius
            temp = Math.round((currently.temperature - 32) * 5 / 9);

            // Get the chance of precipitation in 15 minutes in %
            precip = Math.round(minutely.data[14].precipProbability * 100);

            // Current wind speed in km/h
            wind = Math.round(currently.windSpeed * 1.609344497892563);

            // Humidity in %
            humidity = currently.humidity * 100;

            _this.data = [
                'T: ' + temp + 'C P: ' + precip + '%',
                'H: ' + humidity + '% W: ' + wind + 'km/h',
            ];

            _this.hasData = true;

            // Fetch every 2 minutes, forecast.io has a daily limit of 1000 requests
            _this.cacheExpiry = Date.now() + 60 * 2 * 1000;

            _this.callback(_this);
        }
    });
}

module.exports = new Weather();
