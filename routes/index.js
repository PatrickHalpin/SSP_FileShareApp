var express = require('express');
var router = express.Router();
var fs=require('fs');

//temp global
var files = new Array();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uploadFile', function(req,res,next) {
	res.render('fileUpload');
});

router.post('/uploadFile', function(req,res,next) {
	//A file has been uploaded
	// console.log(req.files[0].filename);

	// var theFile = {};
	// theFile.name = req.files[0].filename
	// theFile.id = Date.now();

	req.files[0]._id = Date.now();

	console.log(req.files[0])

	files.push(req.files[0])

	res.redirect('/files');
});

router.get('/files', function (req, res, next) {
	res.render('test', {theFiles: files});
});

router.get('/deleteFile/:fileID', function(req,res,next){
	console.log("just been asked to delete " + req.params.fileID);

  	for(var i=0; i < files.length; i ++)
  	{
  		if(files[i]._id==req.params.fileID)
  		{
  			//delete file
  			fs.unlink('./uploads/' + files[i].filename, function(error){
  				//do nothing
  			});

  			files.splice(i,1);
  			//break the loop as the array is now shorter
  			break;	
  		}
  	}
	res.redirect('/files');
});

module.exports = router;
