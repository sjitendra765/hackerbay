const multer = require('multer');
const crypto = require('crypto');
const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs')

var storage = multer.diskStorage({
  destination: './uploads/',                                                
  filename: function (req, file, cb) {

    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, 'ntc.png' ) /*+ path.extname(file.originalname))*/
    })
  },
  fileFilter: function (req, file, cb) {
    if (path.extension(file.originalname) !== '.png') {
      return cb(new Error('Only .png are allowed'))
    }

    cb(null, true)
  }
})

  var upload = multer({ storage: storage }).single('thumbnail')
exports.uploads = function (req, res, next) {
	upload(req,res,function(err) {
        if(err) {
            return res.send("Error uploading file.");
        }
        gm('./uploads/ntc.png')
			.resize(50, 50)
			.noProfile()
			.write('./uploads/resize.png', function (err) {
			  if (!err) 
			  var img = fs.readFileSync('./uploads/resize.png');
     		  res.writeHead(200, {'Content-Type': 'image/png' });
     		  res.end(img, 'binary');
     		  if(err){
     		  	res.send({"errors": err})
     		  }
     	});
       
    });
}