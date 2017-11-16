const express = require('express');
const router = express.Router();
const async = require('async');
const request = require("request");
const allmodule = require('../public/javascripts');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("accessed index.js");
  allmodule.google_api.places_api().then(
    function(result){
      console.log(result);
      allmodule.twitter_api.twitter_api().then(
        function(result){
          console.log(result);
          res.render('index', { title: 'Express' });
        },function(error){
          console.log(error);
        });
    },function(error){
      console.log(error);
    });
  });

module.exports = router;
