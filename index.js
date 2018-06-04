var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var index = require('./routes/routes');

// EJS 

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);



// Body Parser MW
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));


app.use('/',index);
//app.use('/api',tasks);





//server
app.listen(8080,function(){
  console.log('Server started in 8080');
});