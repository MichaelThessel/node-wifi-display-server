var express = require('express');
var router = express.Router();

router.get('/api/submit/:line1/:line2?*', function(req, res, next) {
    res.send(req.params.line1, 200);
});

module.exports = router;
