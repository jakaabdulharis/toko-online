var express = require('express');
var router = express.Router();

// export
module.exports = router;

router.get('/', function(req, res){
  res.render("index", {
    title : 'Home'
  })
});
