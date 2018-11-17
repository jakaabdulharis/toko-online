
var express = require("express");
var path = require("path");

// Initial App
var app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setup public folder
app.use(express.static(path.join(__dirname, "public")));


// Srtup Server
var port = 3000;
app.listen(port,function(){
  console.log("Server Running on Port" + port);
});