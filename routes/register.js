var express = require('express');
var router = express.Router();

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/register', { title: 'Registration Page' });
});

module.exports = router;
