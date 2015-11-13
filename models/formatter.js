/*
 * Formats lines for submission to display
 * Format:
 * line1Length|line2Length:line1line2
 *
 * i.e
 *
 *  line1: FOO
 *  line2: FOOBAR
 *
 * 3|6:FOOFOOBAR
 */

function Formatter() {
    this.rows = 2;
    this.columns = 16;

    this.message = '';
    this.lines = [];
    this.options = [];
}

/*
 * Add header tro message
 */
Formatter.prototype.addHeader = function() {
    var header = [], data = '', l;

    for (var i = 0; i < this.lines.length; i++) {
        l = this.lines[i].length;
        header[i] = l < 10 ? '0' + l : l;
        data += this.lines[i];
    }

    this.message = header.join('|') + ':' + data;
}

/*
 * Apply formatting options to each line
 */
Formatter.prototype.applyOptions = function() {
    if (!this.options.length) { return }

    for (var i = 0; i < this.options.length; i++) {
        if (this.options[i] == 'center') {
            this.lines[i] = this.center(this.lines[i]);
        }
    }
}

/*
 * Center a line
 */
Formatter.prototype.center = function(line) {
    var length = line.length;

    for (var i = 0; i < Math.floor((this.columns - length) / 2); i++) {
        line = ' ' + line;
    }

    return line;
}

/*
 * Format data for submission to display
 */
Formatter.prototype.format = function(lines, options) {
    this.lines = lines || [];
    this.options = options || [];

    // Stript the lines to max column length
    for (var i = 0; i < lines.length; i++) {
        if (typeof lines[i] == 'undefined') continue;
        lines[i] = lines[i].toString().substr(0, this.columns);
    }

    this.applyOptions();
    this.addHeader();

    return this.message;
}

module.exports = new Formatter();
