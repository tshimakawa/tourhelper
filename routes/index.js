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
  test();
  res.render('index', { title: 'Express' });
});

module.exports = router;

async function test(){
  console.log("accessed test");
  // const spot_list = await allmodule.google_api.places_api();
  setTimeout(() => {
    console.log("api終了");
    console.log(await allmodule.google_api.places_api());
    console.log("test終了");
}, 4000);
}
