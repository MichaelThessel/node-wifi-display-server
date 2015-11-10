var express = require('express');
var router = express.Router();
var display = require('../models/display.js');

router.get('/api/submit/:line1/:line2*?', function(req, res, next) {

    var line1 = req.params.line1,
        line2 = req.params.line2 || '';

    display([line1, line2]);

    res.write(JSON.stringify({ 'status': 'success' }));
    res.end();
});

module.exports = router;
