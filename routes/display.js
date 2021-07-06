var async = require("async");
var Papa = require("papaparse");
var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const fs = require("fs");
const request = require("request");

var exams = ["205", "218"];

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

router.post("/", upload.single("csv"), (req, res, next) => {
  if (req.file == undefined) next();

  var buff = req.file.buffer;
  var str = buff.toString();
  var data = Papa.parse(str).data;

  /*
   *    +-----------------+
   *    | 205 |     |     |
   *    |     | s3  | s4  |
   *    | Z3  | 2,3 |15,22|
   *    +-----------------+
   */
  var allExams = {};
  var examNum = undefined;
  for (var i = 0; i < data.length; i++) {
    if (exams.includes(data[i][0].trim())) {
      examNum = data[i][0].trim();
      allExams[examNum] = {};
    } else if (data[i][0] === "") {
    } else {
      allExams[examNum][data[i][0]] = [
        data[i][1].split(","),
        data[i][2].split(","),
      ];
    }
  }

  var prefix =
    'https://host1.kkmsee.com:3000/api/exams?filter={"where":{"xdf_serial":"';
  var callsForExamData = [];
  var stat = {};
  for (var exam in allExams) {
    var prefixWithExam = prefix + exam + '"},"fields":[';
    stat[exam] = {};
    for (var stu in allExams[exam]) {
      stat[exam][stu] = {};
      var s3 = allExams[exam][stu][0];
      var s4 = allExams[exam][stu][1];
      var S3 = "";
      var S4 = "";
      for (i = 0; i < s3.length - 1; i++) {
        S3 += '"s3q' + s3[i] + '",';
      }
      S3 += '"s3q' + s3[i] + '"';
      for (i = 0; i < s4.length - 1; i++) {
        S4 += '"s4q' + s4[i] + '",';
      }
      S4 += '"s4q' + s4[i] + '"';

      var requestOptions = {
        // a sample url
        // 'https://host1.kkmsee.com:3000/api/exams?filter={"where":{"xdf_serial":"205"},"fields":["s4q2","s4q5"]}'
        url: prefixWithExam + S3 + "," + S4 + "]}",
        method: "GET",
        json: {},
        qs: {
          offset: 0,
        },
      };
      callsForExamData.push(
        // use a function to preserve the scope, call this function and let it return the callback function
        (function () {
          var ro = requestOptions;
          var e = exam;
          var s = stu;
          return function (next) {
            request(ro, (err, response, body) => {
              if (err) {
                console.log(err);
              } else if (response.statusCode === 200 && body.length !== 0) {
                var count = {};
                var output = Object.values(body[0]);
                for (i = 0; i < output.length; i++) {
                  var cats = output[i].split(";")[1].split(",");
                  for (j = 0; j < cats.length; j++) {
                    if (cats[j] in count) count[cats[j]] += 1;
                    else count[cats[j]] = 1;
                  }
                }
                stat[e][s] = count
              } else {
                console.log(response.statusCode);
              }
              next();
            });
          };
        })()
      );
    }
  }

  async.parallel(callsForExamData, function (err, results) {
    if (err) console.log(err);
    else {
      res.render("pages/display", {
        title: "Display Page",
        stat: stat
      });
    }
  });
});

module.exports = router;
