const express = require('express');
const router = express.Router();
//asyncをrequire
const async = require('async');
//requestをrequire
const request = require("request");

/* POST Request */
router.post('/', function(req, res, next) {
  console.log("accessed search_dest.js");

  async.waterfall([
  function(callback) {

    // 受け取りようの引数
    const responseDate = undefined;

    // 同期通信でGETリクエスト
    request.get({
      url: get_sha_url,
      headers: {
        'User-Agent': 'request',
        'Authorization':'token c2d3babdfc93816c0a8f83b0694be2bfa3c9e1b6'
      },
      json:true
    }, function (error, response, body) {
      //console.log(error);
      responseDate = body;
      callback(null,responseDate);
    });
  },
  function(commit_list,callback){//すでにcommitsコレクションに格納されているshaの一覧を取得
    var already_commits_list = [];

    Commits.find({},function(err,docs){
      for (var i=0,size=docs.length;i<size;++i){
        for(var j = 0;j<docs[i].commit.length;j++){
          already_commits_list[j] = docs[i].commit[j].sha;
        }
      }
      callback(null,commit_list,already_commits_list);
    });
  },
  function(commit_list,already_commits_list,callback){

    let regist_commit_list = [];

    // console.log(commit_list);
    // console.log(already_commits_list);

    for (var i = 0; i < commit_list.length;i++) {
      var judge_flag = 0;//shaがすでにcommitコレクションに格納されているかを判断するためのフラグ
      for(var j = 0;j < already_commits_list.length;j++){

        if(commit_list[i].sha == already_commits_list[j]){
          judge_flag = 1;
        }
      }
      if(judge_flag == 1){
        break;
      }else {
        regist_commit_list[i] = commit_list[i].sha;
      }
    }
    callback(null,regist_commit_list);
  },
  function(regist_commit_list, callback) {

    console.log(regist_commit_list);
    console.log("--------------------------");

    // owner/repo/commitsのshaでurlを生成
    var single_commit = new Array(regist_commit_list.length);
    var count = 0;

    let commits_data = [];//全コミットの情報を格納する変数

    //for (var i = 0; i < 1;i++) {
    for (var i = 0; i < regist_commit_list.length;i++) {
      var single_commit_url=url+"/"+regist_commit_list[i];

      // 同期通信でGETリクエスト
      request.get({
        url: single_commit_url,
        headers: {
          'User-Agent': 'request',
          'Authorization':'token c2d3babdfc93816c0a8f83b0694be2bfa3c9e1b6'
        },
        json:true
      }, function (error, response, body) {

        let commit_data = new Object();//各コミットの情報を格納する変数

        console.log(count);
        single_commit[count]=body;

        commit_data.sha = body.sha;
        commit_data.comment = body.commit.message;
        commit_data.name = body.commit.committer.name;
        commit_data.time = body.commit.committer.date;
        commit_data.additions = body.stats.additions;
        commit_data.deletions = body.stats.deletions;
        commit_data.total = body.stats.total;

        commits_data[count] = commit_data;

        if(count == regist_commit_list.length-1){
          //console.log(commits_data[2]);
          callback(null,commits_data);
        }
        count+=1;
      });
    }
  }
], function(err, result) {
  if (err) {
    throw err;
  }
  console.log('all done.');
  //console.log(result);

  for(let i = 0;i<result.length;i++){
    result[i].time = parseUnixTime(result[i].time);
  }
  console.log(result);
  registCommit(result);

});
}

  res.render('index', { title: 'Express' });
});

module.exports = router;
