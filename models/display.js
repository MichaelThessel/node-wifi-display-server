var tcpclient = require('./tcpclient.js');
var formatter = require('./formatter.js');

/*
 * Sends formatted string to display
 */
module.exports = function(line1, line2) {
    tcpclient.send(formatter.format(line1, line2));
}
