const async = require('async');
const request = require("request");

exports.places_api=function(){

  //探索範囲をドライブ時間から計算
  // const starttime = parameters.starttime;
  // const endtime = parameters.endtime;
  // const latitude = parameters.latitude;
  // const longitude = parameters.longitude;

  async.waterfall([
  function(callback) {
    console.log('api叩く前');
    // 受け取りようの引数
    const responseDate = undefined;
    // 同期通信でGETリクエスト
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
      const result = body.results;
      const spot_list = [];
      const spot = {};
      console.log(result.length);
      for (var i=0;i<result.length;i++){
        spot.latitude = result[i].geometry.location.lat;
        spot.longitude = result[i].geometry.location.lng;
        spot.name = result[i].name;
        spot.icon = result[i].icon;
        spot_list.push(spot);
      }
      callback(null,spot_list);
    });
  }],function(err, result) {
    if (err) {
      throw err;
    }
    console.log('all done.');
    //console.log(result);
    console.log(result);
  });
}
