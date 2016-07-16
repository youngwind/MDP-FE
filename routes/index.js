var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/release', function (req, res, next) {
    res.render('release');
});

module.exports = router;
