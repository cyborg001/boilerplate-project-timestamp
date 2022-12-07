// index.js
// where your node app starts

// init project

var express = require('express');
require('dotenv').config();
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get('/:word/echo',function(req,res){
  console.log(req.params.word)
})
app.get("/api/:date?",function(req,res){
  let unix = req.params.date;
  let utcDate;

  if (unix == undefined){
    unix = new Date().getTime();
    console.log('klk')
    utcDate =  new Date().toUTCString();
  }else if(unix != Number(unix)){
    unix  = new Date(req.params.date).getTime();
    utcDate = new Date(unix).toUTCString();
    console.log('not number')
  }else{
    utcDate = new Date(Number(unix)).toUTCString();
    console.log('number')
  }

  if(utcDate == 'Invalid Date'){
    res.json({error: utcDate});
  }else{
    res.json({unix: unix, utc: utcDate});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
