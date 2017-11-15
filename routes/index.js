const express = require('express');
const router = express.Router();
const async = require('async');
const request = require("request");
const allmodule = require('../public/javascripts');

/* GET home page. */
router.get('/', function(req, res, next) {
  // async.waterfall([
  // async function(callback) {
  //     const spot_list = await allmodule.google_api.places_api();
  //     callback(null,spot_list);
  // }],function(err, result) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(result);
  //   res.render('index', { title: 'Express' });
  // });
  console.log("accessed index.js");
  allmodule.google_api.places_api().then(
    function(result){
      console.log(result);
      res.render('index', { title: 'Express' });
    },function(error){
      console.log(error);
    });
  });

module.exports = router;
