const express = require('express');
const router = express.Router();
const allmodule = require('../public/javascripts');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("accessed index.js");
  const spot_list = allmodule.google_api.places_api();
  console.log(spot_list);
  res.render('index', { title: 'Express' });
});

module.exports = router;
