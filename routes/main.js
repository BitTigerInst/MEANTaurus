var router = require('express').Router();

router.get('/about', function(req, res) {
	res.render('main/about');
})

router.get('/', function(req, res) {
	res.render('main/home');
})

module.exports = router;