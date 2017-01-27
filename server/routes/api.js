const express = require('express');
const router = express.Router();

var models = require('../models/models.js');

/* GET api listing. */
router.get('/hej', (req, res) => {
  console.log("We are here");
  var user = models.User.add(randomString(10));
  res.send(user);
});

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

module.exports = router;