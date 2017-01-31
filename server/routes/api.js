const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var models = require('../models/models.js');

var secret = 'JBSJqOyxo3zDkgxlCbJoUb2FSZ5F9SrUz20J3uQ4CV5cQY6H6gmKCmPfnUN4-BiT';


/* GET api listing. */
router.get('/hej', (req, res) => {
    console.log("We are here");
    var user = models.User.add(randomString(10));
    res.send(user);
});

router.get('/authenticate', (req, res) => {
    //console.log(req.headers.authorization);
    console.log("CALLED NOW");
    var decoded;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.replace("Bearer ", "");
        try {
            console.log("*****************AUTHORIZATION********");
            console.log(authorization);
            decoded = jwt.verify(authorization, secret);
        } catch (e) {
            console.log(e);
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.sub;

        models.User.add(userId).then(user => {
            console.log("**************HELlLOEOOEO***************");
            console.log("***USER?***")
            console.log(user.user);
            console.log("***CREATED?***")
            console.log(user.created);
            console.log("***MESSAGE?***");
            console.log(user.message);
            res.sendStatus(200);
        });

    } else {
        res.sendStatus(401).send('Unauthorized');
    }



});



function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

module.exports = router;