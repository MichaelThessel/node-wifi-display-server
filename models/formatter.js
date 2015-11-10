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
exports.format = function(line1, line2) {
    var l1 = line1.length,
        l2 = line2.length,
        message;

    l1 = (l1 < 10) ? '0' + l1 : l1;
    l2 = (l2 < 10) ? '0' + l2 : l2;

    message = l1 + '|' + l2 + ':' + line1 + line2;

    return message;
}
