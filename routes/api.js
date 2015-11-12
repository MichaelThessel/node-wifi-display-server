var express = require('express');
var router = express.Router();
var display = require('../models/display.js');
var queue = require('../models/queue.js');

router.get('/api/submit/:line1*', function(req, res, next) {
    var line1 = req.params.line1,
        line2 = '',
        priority = 'ALERT',
        params = req.params[0].split('/');

    // Parse line2 parameter
    if (typeof params[1] != 'undefined') {
        line2 = params[1];
    }

    // Parse priority parameter
    if (typeof params[2] != 'undefined') {
        priority = params[2];
    }

    display([line1, line2]);

    queue.setCurrentJobTtl(priority);

    res.write(JSON.stringify({ 'status': 'success' }));
    res.end();
});

module.exports = router;
