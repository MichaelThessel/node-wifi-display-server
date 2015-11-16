var Job = require('./job.js');
var config = require('../../config.js');
var exec = require('child_process').exec;

/**
 * Displays file system statistics
 */
function FileSystem() {
    this.priority = 'INFO';
    this.hasData = true;
}

FileSystem.prototype = new Job();

FileSystem.prototype.getData = function () {
    var command, fileSystems = [];
    this.hasData = false;

    for (var i = 0; i < config.jobs.fileSystem.length; i++) {
        fileSystems[i] =  config.jobs.fileSystem[i].fs;
    }

    fileSystems = fileSystems.join(' ');
    command = '/bin/df ' + fileSystems + ' --output="pcent"';

    var _this = this;
    child = exec(command, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            stdout = stdout.split('\n');
            stdout.shift();

            for (var i = 0; i < config.jobs.fileSystem.length; i++) {
                _this.data[i] = config.jobs.fileSystem[i].label + ': ' + stdout[i].trim();
            }

            _this.hasData = true;
            _this.callback(_this);
        }
    });
}

module.exports = new FileSystem();
