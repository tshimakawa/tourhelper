const async = require('async');
const request = require("request");
const twitter = require('twitter');

const client = new twitter({
  consumer_key: "4iwpQDHb1ZY9TdGxF5uMpcRxk",
  consumer_secret: "Zezzrkom2GiBVchn6usn0wWkmKryoWJzQAUMEOTZTeeiUlgm4Q",
  access_token_key: "1345331436-yRJ3Tkmtqtl4ONROu7oxHNwEy5Yrw0qbRRZfTdT",
  access_token_secret: "1WSp9lhSwKSrJTRUTuLJPSenqNhCKLC2grf0nKgZg5H33",
});

exports.twitter_api = function(spot_list){
  return new Promise(function(resolve,reject){
    console.log("accessed twitter_api.js");
    console.log(spot_list[1]);
    search(spot_list).then(
      function(result){
        resolve(result);
      },function(error){
        reject(error);
      });
  });
}

//キーワードで検索
function search(spot_list){
  return new Promise(function(resolve,reject){
    const spot_info = [];
    for(let i=0;i<spot_list.length;i++){
      var options = {};
      options.q = spot_list[i].name;
      options.count = 100;
      client.get('search/tweets', options, function(error, tweets, response){
        if (error) {
          reject(error); // errがあればrejectを呼び出す
          return;
        }
        const tweet = tweets.statuses;
        const spot = {};
        spot.name = spot_list[i].name;
        spot.latitude = spot_list[i].latitude;
        spot.longitude = spot_list[i].longitude;
        spot.count = tweet.length;
        spot.lasttime = tweet[tweet.length-1].created_at;
        spot_info.push(spot);
        if(i==spot_list.length-1){
          resolve(spot_info);
        }
      });
    }
  });
}
