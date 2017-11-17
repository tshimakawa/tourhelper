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
    let count = 0;
    const spot_info = [];
    console.log("accessed twitter_api.js");
    for(let i=0;i<spot_list.length;i++){
      search(spot_list[i]).then(
      function(result){
        count += 1;
        console.log(count);
        if(result){
          spot_info.push(result);
          console.log("spot_infoに追加したよ");
        }
        if(count == spot_list.length){
          console.log("twitter_apiのresolveに入りました");
          spot_info = makeRanking(spot_info);
          resolve(spot_info);
        }
      },function(error){
        reject(error);
        return;
      });
    }
  });
}

//キーワードで検索
function search(spot_list){
  return new Promise(function(resolve,reject){
    console.log(spot_list);
    // for(const i=0;i<spot_list.length;i++){
    var options = {};
    options.q = spot_list.name;
    options.count = 100;
    client.get('search/tweets', options, function(error, tweets, response){
      if (error) {
        console.log("searchのerrorに入りました");
        reject(error); // errがあればrejectを呼び出す
        return;
      }
      console.log("----------------------------------------------------------");
      const tweet = tweets.statuses;
      const spot = {};
      if(tweet.length > 0){
        spot.name = spot_list.name;
        spot.latitude = spot_list.latitude;
        spot.longitude = spot_list.longitude;
        spot.count = tweet.length;
        spot.lasttime = tweet[tweet.length-1].created_at;
        console.log(spot.name);
        console.log("true");
        console.log("searchのresolveに入りました");
        resolve(spot);
      }else {
        console.log(spot_list.name);
        console.log("false");
        resolve(false);
      }
    });
    // }
  });
}

function makeRanking(spotinfo){
  let spot_info = spotinfo;
  console.log("makeRankingに入りました");
  for (let j = 0; j < spot_info.length-1; j++){
    for (let k = j; k < spot_info.length; k++) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
      if(spot_info[k].count > spot_info[j].count){
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb");
        let num = spot_info[j];
        console.log("cccccccc");
        spot_info[j] = spot_info[k];
        console.log("dddddddd");
        spot_info[k] = num;
      }else if (spot_info[k].count == spot_info[j].count) {
        console.log("eeeeee");
        if(spot_info[k].lasttime > spot_info[j].lasttime ){
          console.log("fffffff");
          let num = spot_info[j];
          console.log("ggggggggg");
          spot_info[j] = spot_info[k];
          console.log("hhhhhhhhh");
          spot_info[k] = num;
        }
      }
    }
  }
  return spot_info;
}
