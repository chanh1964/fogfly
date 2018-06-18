import db from '../database/'
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(db.db[0].directionList[0].vehNum);
  console.log("inside get " + db.timeStamp)
  res.render('index', { db: db });
});

module.exports = router;
