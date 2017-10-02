
var express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.sendfile('index.html');
});

module.exports = router;
