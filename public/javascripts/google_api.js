const async = require('async');
const request = require("request");

exports.places_api = function(){
//   console.log("accessed google_api.js");
//   async.waterfall([
//     function(callback) {
//       console.log("$$$$$$$$");
//   // 同期通信でGETリクエスト
//   request.get({
//     url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
//     headers:{
//       'Content-Type':'text/plain;charset=utf-8'
//     },
//     qs:{
//       key:'AIzaSyDnjy1JCD2XQNej0kWaGnXN_VNrhxvmogs',
//       location:'35,135',
//       radius:'50000',
//       keyword:'水族館',
//     },
//     json:true
//   }, function (error, response, body) {
//     console.log('##########################');
//     const result = body.results;
//     const spot_list = [];
//     for (var i=0;i<result.length;i++){
//       const spot = {};
//       spot.latitude = result[i].geometry.location.lat;
//       spot.longitude = result[i].geometry.location.lng;
//       spot.name = result[i].name;
//       spot_list[i] = spot;
//     }
//     callback(null,spot_list);
//   });
// }],function(err, result) {
//   if (err) {
//     throw err;
//   }
//   console.log('----------------------------------------------------');
//   console.log(result);
//   return result;
// });
//   console.log('!!!!!!!!!!!!!!');
  //探索範囲をドライブ時間から計算
  // const starttime = parameters.starttime;
  // const endtime = parameters.endtime;
  // const latitude = parameters.latitude;
  // const longitude = parameters.longitude;

  return new Promise(function(resolve,reject){
    console.log("accessed google_api.js");
    getPlaces().then(
      function(result){
        resolve(result);
      },function(error){
        reject(error);
      });
  });
}

function getPlaces() {
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
