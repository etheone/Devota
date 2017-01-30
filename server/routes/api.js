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
       
        Promise.join(
            models.User.find(userId), function(find) {
                if(find != null) {
                    console.log("****************** HELLLLLOOO **************");
                    console.log(find);
                    res.status(200).send(find.id);
                }
        }).catch(function(e) {
            console.err("THERE WAS ERROR");
            console.err(e);
        });
        

            //console.log(user);

        /*      if (user) {
                  console.log(user);
              } else {
                  console.log(user);
              }*/

        //res.sendStatus(200);
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