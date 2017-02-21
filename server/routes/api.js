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
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/devices/update', (req, res) => {
    //To be implemented - Update device
    if (checkAuthorization(req)) {
        var device = req.body;
        console.log("/devices/update");
        console.log(device);
        console.log(device.deviceId);
        models.Device.edit(device.deviceId, device.deviceName, device.description).then(device => {
            if (device != null) {
                console.log("Device from edit callback");
                console.log(device);
                console.log(device[0]);
                res.status(200).send(JSON.stringify(device));
            } else {
                res.sendStatus(400);
            }
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/devices/remove', (req, res) => {
    //To be implemented - Remove device
});

router.post('/data/add', (req, res) => {
    //To be implemented - Add data
    var body = req.body;
    var deviceId;
    var userId = getUserId(req);
    models.Device.find(null, userId).then(devices => {
        if (devices != null) {
            console.log(devices);
            var count = devices.length;
            var deviceNr = Math.floor((Math.random() * (count + 1)));
            console.log("Device # in /data/add: " + deviceNr);
            deviceId = devices[deviceNr].id;
            console.log("DeviceID in /data/add: " + deviceId);
            models.Device.find(deviceId, null).then(device => {
                var data = JSON.stringify(body.data);
                if (device != null) {

                    models.Data.add(deviceId, data).then(data => {
                        if (data != null) {
                            console.log("Successfully added data!");
                            res.sendStatus(200);
                        } else {

                            /////
                            ///// ADD APPROPERIATE STATUS CODE
                            /////
                            res.sendStatus(400);
                        }
                    });

                } else {

                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(400);
        }
    });

    router.post('/data/addreal', (req, res) => {
    //To be implemented - Add data
    var body = JSON.parse(req.body);
    
    var deviceId = body.deviceId;
    delete body["deviceId"];
    //var userId = getUserId(req);
    models.Device.find(deviceId, null).then(device => {
        if (device != null) {
            //console.log(devices);
            //var count = devices.length;
            //var deviceNr = Math.floor((Math.random() * (count + 1)));
            //console.log("Device # in /data/add: " + deviceNr);
            //deviceId = devices[deviceNr].id;
            //console.log("DeviceID in /data/add: " + deviceId);
            models.Device.find(deviceId, null).then(device => {
                var data = JSON.stringify(body.data);
                if (device != null) {

                    models.Data.add(deviceId, data).then(data => {
                        if (data != null) {
                            console.log("Successfully added data!");
                            res.sendStatus(200);
                        } else {

                            /////
                            ///// ADD APPROPERIATE STATUS CODE
                            /////
                            res.sendStatus(400);
                        }
                    });

                } else {

                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(400);
        }
    });



    /*  if (checkDeviceId(deviceId)) {
          console.log("IN HERE");
          models.Data.add(body.deviceId, body.data).then(data => {
              if (data != null) {
                  res.sendStatus(200);
              } else {
  
                  /////
                  ///// ADD APPROPERIATE STATUS CODE
                  /////
                  res.sendStatus(400);
              }
          });
      } else {
          console.log("Not in there");
  }*/
});



    /*  if (checkDeviceId(deviceId)) {
          console.log("IN HERE");
          models.Data.add(body.deviceId, body.data).then(data => {
              if (data != null) {
                  res.sendStatus(200);
              } else {
  
                  /////
                  ///// ADD APPROPERIATE STATUS CODE
                  /////
                  res.sendStatus(400);
              }
          });
      } else {
          console.log("Not in there");
  }*/
});

router.get('/data/remove', (req, res) => {
    //To be implemented - Remove add
});

router.get('/data/find', (req, res) => {

    if (checkAuthorization(req)) {
        userId = getUserId(req);

    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/data/findbyuser', (req, res) => {

    if (checkAuthorization(req)) {
        userId = getUserId(req);
        models.Data.findByUser(null, userId).then(data => {
            res.status(200).send(JSON.stringify(data));
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

function checkDeviceId(deviceId) {
    models.Device.find(deviceId, null).then(device => {
        console.log("DEVICE:");
        console.log(device);
        if (device != null) {
            console.log("Device is true");
            return true;
        } else {
            console.log("Device is false");
            return false;
        }
    });
}

module.exports = router;