const express = require('express');
const router = express.Router();
const async = require('async');
const request = require("request");
const allmodule = require('../public/javascripts');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("accessed index.js");
  allmodule.google_api.places_api().then(
    function(places_api_result){
      console.log("google_placecs_apiの結果です");
      console.log(places_api_result);
      allmodule.twitter_api.twitter_api(places_api_result).then(
        function(twitter_api_result){
          console.log("twitter_apiの結果です");
          // console.log(twitter_api_result);
          res.render('index', { title: 'Express' });
        },function(error){
          console.log(error);
        });
    },function(error){
      console.log(error);
    });
  });

module.exports = router;
