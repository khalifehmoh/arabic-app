var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('./'));

app.get('/index', function (req, res) {
    // console.log(__dirname);
    // res.send(__dirname);
    res.sendFile(path.join(__dirname + '/ArabicAssesApp.html'));
});

app.listen(5000, '192.168.1.14');
