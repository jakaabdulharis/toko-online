var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');
var config = require('./config/database');
var session = require('express-session');
var expressValidator = require('express-validator');

// Initial App
var app = express();


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
              , root = namespace.shift()
              , formParam = root;

      while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      };
  }
}));



// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setup public folder
app.use(express.static(path.join(__dirname, "public")));

// Setup Global errors variable
app.locals.errors = null;


// Setup Index
// app.get('/', function(req,res){
//   res.send("Ini adalah index ya Wakwa w")
// });

// set routes 
var pages = require('./routes/pages.js')
var adminPages = require('./routes/admin_pages.js');
app.use('/', pages);
app.use('/admin/pages', adminPages);


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Srtup Server
var port = 3000;
app.listen(port,function(){
  console.log("Server Running on Port " + port);
});

mongoose.connect(config.database);
// mongoose.connect(config.database);
// mongoose.connect("mongodb://localhost:27017/toko-online", { useNewUrlParser: true });
// mongoose.connect('mongodb://user:pw@localhost:27017/toko-online', { useNewUrlParser: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log('Connected to MongoDB')
});
