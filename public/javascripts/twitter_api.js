const async = require('async');
const request = require("request");
const twitter = require('twitter');

const client = new twitter({
  consumer_key: "QYpiNgBXqjd4WKL6ONvbw4r2G",
  consumer_secret: "WbyafMeqMfCsmiKQupR3VuVsFVSJMhMmtXJhg7NlYZONoZppNU",
  access_token_key: "1345331436-c8KQA7IKfKoauei7Qw7wZA72DHbTbs9iHo5KXl0",
  access_token_secret: "2gSy2Pt4yGMou20YKftlNzCPnEgoTjSm6CuH3m5zfkOF4",
});

exports.twitter_api = function(){
  return new Promise(function(resolve,reject){
    console.log("accessed twitter_api.js");
    search("海遊館").then(
      function(result){
        resolve(result);
      },function(error){
        reject(error);
      });
  });
}

//キーワードで検索
function search(spot_name){
  return new Promise(function(resolve,reject){
    var options = {};
    options.q = spot_name;
    options.count = 100;
    client.get('search/tweets', options, function(error, tweets, response){
      if (error) {
        reject(error); // errがあればrejectを呼び出す
        return;
      }
      console.log("---------------------------");
      console.log(tweets.starus);
      const tweets = tweets.status;
      console.log("---------------------------");
      console.log(tweets.length);
      console.log(tweets[tweets.length-1]);
      resolve("できました");
    });
  });
}

function getRanking() {
  return new Promise(function(resolve,reject){
    request.get({
      url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
      headers:{
        'Content-Type':'text/plain;charset=utf-8'
      },
      qs:{
        key:'AIzaSyDnjy1JCD2XQNej0kWaGnXN_VNrhxvmogs',
        location:'35,135',
        radius:'50000',
        keyword:'水族館',
      },
      json:true
    }, function (error, response, body) {
      if (error) {
        reject(error); // errがあればrejectを呼び出す
        return;
      }
      const result = body.results;
      const spot_list = [];
      for (var i=0;i<result.length;i++){
        const spot = {};
        spot.latitude = result[i].geometry.location.lat;
        spot.longitude = result[i].geometry.location.lng;
        spot.name = result[i].name;
        spot_list[i] = spot;
      }
      resolve(spot_list);
    });
  });
}
