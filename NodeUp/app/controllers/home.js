var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    formidable = require('formidable'),
    fs = require('fs'),
    Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.post('/upload', function (req, res, next) {
  // console.log(req.body.upload);
  // res.json({
  //   "fileName": "image(25).png",
  //   "uploaded": 1,
  //   "url":'http://s1.ckeditor.com/sites/default/files/styles/screenshot/public/image/image_manager.png?itok=GebsryRc'
  // });
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';		//设置编辑
  form.keepExtensions = true;	 //保留后缀
  form.uploadDir = 'public/upload';
  form.parse(req,function(err, fields, files){
    console.log(files);

    var str = files.upload.path;
    var fileName = files.upload.name;
    var url = str.substring(6);
    if(err){
      res.json({
        "uploaded": 0
      });
    }
    res.json({
      "fileName": fileName,
      "uploaded": 1,
      "url": url
    });
  })
});