var express = require('express');
var router = express.Router();
var fs = require('fs');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function arrayContains(arr, str) {
    for (var i in arr) {
        if (str == arr[i]) {
            return true;
        }
    }
    return false;
}

function getFileList() {
    var fileList = {};
    var files = [];
    var root = './video';
    var path = fs.readdirSync(root);
    for (var i in path) {
        var p = path[i];
        if (endsWith(p, '.mp4')) {
            var file = {};
            file.name = p;
            files.push(file);
            file.vtt = fs.existsSync(root + '/' + p + '.vtt');
        }
    }
    fileList.files = files;
    return fileList;
}

console.log(getFileList());
/* GET home page. */
router.get('/', function(req, res) {
  res.set('X-Organization', 'Nintendo');
  
  var host = req.headers.host;
  if (host == 'conntest.nintendowifi.net') {
	res.render('success');
	return;
  }
  res.render('index', { fileListJson: JSON.stringify(getFileList()) });
});

router.get('/play', function (req, res) {
    res.render('play', { title: 'Play' });
});


router.post('/ars2/rating', function (req, res) {
	res.send(new Buffer([0x41, 0x52, 0x53, 0x2F, 0x32, 0x2E, 0x30, 0x0D, 0x0A, 0xA6, 0xCF, 0xBF, 0xD5, 0xA6, 0xA6, 0xBF, 0xD5, 0xA6, 0xA6, 0xBF, 0xD5, 0xA6, 0xA6, 0xBF, 0xD5, 0x63, 0xA6, 0xBF, 0xD6, 0x14, 0x0E, 0x9B, 0x0F, 0x9D, 0xE0, 0x8C, 0xBE, 0x39, 0x14, 0x7F, 0x5B, 0xCE, 0x05, 0xBD, 0x51, 0x5A, 0xD4, 0xA7, 0xCE, 0xC0, 0x70, 0xC0]));
});


module.exports = router;
