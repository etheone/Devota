const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var models = require('../models/models.js');

var secret = 'JBSJqOyxo3zDkgxlCbJoUb2FSZ5F9SrUz20J3uQ4CV5cQY6H6gmKCmPfnUN4-BiT';


/* GET api listing. */
router.get('/hej', (req, res) => {
    console.log("We are here");
    var user = models.User.add(randomString(10));
    res.send(user);
});

router.get('/authenticate', (req, res) => {
    var decoded;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.replace("Bearer ", "");
        try {
            decoded = jwt.verify(authorization, secret);
        } catch (e) {
            console.log(e);
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.sub;
        models.User.findOrAdd(userId).then(user => {
            res.sendStatus(200);
        });

    } else {
        res.sendStatus(401).send('Unauthorized');
    }



});


router.post('/devices/create', (req, res) => {
    console.log("req.body in /devices/create");
    console.log(req.body);
    //console.log(req.body.device);
    var device = req.body;
    //var device = JSON.parse(req.body);
    var userId;
    console.log("Device stuff:::::");
    console.log("Name: " + device.deviceName + " Description: " + device.description);
    if (checkAuthorization(req)) {
        //Create a device and return status 200 and id????
        userId = getUserId(req);
        models.Device.add(device.deviceName, device.description, userId).then(device => {
            res.status(200).send(JSON.stringify(device));
        })

    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/devices/find', (req, res) => {
    //console.log("req.body in /devices/find");

    if (checkAuthorization(req)) {
        userId = getUserId(req);
        models.Device.find(null, userId).then(device => {
            res.status(200).send(JSON.stringify(device));
        })
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

function checkAuthorization(req) {
    if (req.headers && req.headers.authorization) {
        return true;
    } else {
        return false;
    }
}

function getUserId(req) {
    var idToken = req.headers.authorization.replace("Bearer ", "");
    try {
        decoded = jwt.verify(idToken, secret);
    } catch (e) {
        console.log(e);
        return res.status(401).send('unauthorized');
    }
    return decoded.sub;
}

module.exports = router;