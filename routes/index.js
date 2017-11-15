const express = require('express');
const router = express.Router();
const google_api = require('./public/javascripts/google_api.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("accessed index.js");
  google_api.places_api();
  res.render('index', { title: 'Express' });
});

module.exports = router;
