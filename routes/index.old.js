var express = require('express');
var router = express.Router();

const request = require('request');
const requestOptions = {
  url: 'https://host1.kkmsee.com:3000/api/knowledge-tags',
  method: 'GET',
  json: {},
  qs: {
    offset: 0
  }
};
var output;
request(requestOptions, (err, response, body) => {
  if (err) {
    console.log(err);
  } else if (response.statusCode === 200) {
    output = body[2];
    console.log(body);
  } else {
    console.log(response.statusCode);
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: output.name });
});

module.exports = router;


