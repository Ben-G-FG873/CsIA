var express = require('express');
var router = express.Router();

const request = require('request');
const requestOptions = {
  url: 'https://host1.kkmsee.com:3000/api/exams?filter={"where":{"xdf_serial":"205"},"fields":["s4q2","s4q5","s4q20"]}',
  method: 'GET',
  json: {},
  qs: {
    offset: 0
  }
};
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var output;
var stat = Object();
var dataX;
var dataY;
request(requestOptions, (err, response, body) => {
  if (err) {
    console.log(err);
  } else if (response.statusCode === 200) {
    output = body[0];
    output = Object.values(output);
    for (i = 0; i < output.length; i++) {
        var cats = output[i].split(";")[1].split(",");
        console.log(cats);
        for (j = 0; j < cats.length; j++) {
            if (cats[j] in stat) stat[cats[j]] += 1;
            else stat[cats[j]] = 1;
        }
    }
    dataX = Object.keys(stat);
    dataY = Object.values(stat);
    console.log(dataX);
    console.log(dataY);
  } else {
    console.log(response.statusCode);
  }
});




/*
var pgp = require('pg-promise')()
var db = pgp('postgres://gmh:IBIAscore34@host1.kkmsee.com:5432/projdb')

db.one('SELECT * FROM knowledge_catagories WHERE id = $1', 5)
  .then(function (data) {
    console.log('DATA:', data)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
*/





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Questions', dataX: dataX, dataY: dataY });
});

module.exports = router;
