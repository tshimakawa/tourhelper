const express = require('express');
const router = express.Router();
const async = require('async');
const request = require("request");
const allmodule = require('../public/javascripts');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("accessed index.js");
  console.log(spot_list);

  async.waterfall([
  function(callback) {
    const spot_list = allmodule.google_api.places_api();
    callback(null,spot_list);
  }],function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
