var net = require('net');
var config = require('../config.js');

/*
 * Sends formatted string to display
 */
exports.send = function(message) {
    var client = new net.Socket();

    client.connect(config.display.port, config.display.ip, function() {
        console.log('Sending message: ' + message);
        client.write(message);
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}
