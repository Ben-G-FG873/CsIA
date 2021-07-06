var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const fs = require('fs');

const request = require('request');
var requestOptions = {
  url: 'https://host1.kkmsee.com:3000/api/exams?filter={"where":{"xdf_serial":"205"},"fields":["s4q2","s4q5"]}',
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
/* GET home page. */
router.get('/', function(req, res, next) {



console.log(req.query.keys);
console.log(requestOptions.url);
requestOptions.url = 'https://host1.kkmsee.com:3000/api/exams?filter={"where":{"xdf_serial":"205"},"fields":'+req.query.keys+'}'
console.log(requestOptions.url);
request(requestOptions, (err, response, body) => {

  if (err) {
    console.log(err);
  } else if (response.statusCode === 200) {
    output = body[0];
    output = Object.values(output);
    console.log(output);
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



  res.render('index', { title: 'Exam Analysis', dataX: dataX, dataY: dataY });
});


router.post('/', upload.single('photo'), (req, res) => {
  // error handling ...
  var url = '/?keys=[';
  if (req.file) {
    console.log('Uploaded: ', req.file);
    var b = req.file.buffer;
    var s = b.toString();
    console.log(s);
    var input = s.split('\n')[1].split(',');
    console.log(input);
    var s3 = input[1].split(';');
    var s4 = input[2].split(';');
    console.log(s3);
    console.log(s4);
    var S3 = '';
    for (i = 0; i < s3.length - 1; i++) {
      S3 += '"s3q';
      S3 += s3[i];
      S3 += '",';
    }
    S3 += '"s3q';
    S3 += s3[i];
    S3 += '"';
    var S4 = '';
    for (i = 0; i < s4.length - 1; i++) {
      S4 += '"s4q';
      S4 += s4[i];
      S4 += '",';
    }
    S4 += '"s4q';
    S4 += s4[i];
    S4 += '"';
    console.log(S3);
    console.log(S4);
    url += S3;
    url += ',';
    url += S4;
    url += ']';
    console.log(url);
    //let data = fs.createReadStream(req.file.photo.path,'utf8');
    //console.log(data);
  }

  res.redirect(url);
});

module.exports = router;
