const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var models = require('../models/models.js');
var fileSystem = require('fs');
var path = require('path');
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

router.get('/news/find', (req, res) => {
    if (checkAuthorization(req)) {
        models.News.find().then(news => {
            res.status(200).send(JSON.stringify(news));
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/news/create', (req, res) => {
    var news = req.body;
    if (checkAuthorization(req)) {
        models.News.add(news.title, news.description, news.date).then(news => {
            res.status(200).send(JSON.stringify(news));
        })
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/quickstart/find', (req, res) => {
    if (checkAuthorization(req)) {
        models.Quickstart.find().then(quickstart => {
            res.status(200).send(JSON.stringify(quickstart));
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/quickstart/create', (req, res) => {
    var quickstart = req.body;
    if (checkAuthorization(req)) {
        models.Quickstart.add(quickstart.title, quickstart.description).then(quickstart => {
            res.status(200).send(JSON.stringify(quickstart));
        })
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/advanced/find', (req, res) => {
    if (checkAuthorization(req)) {
        models.Advanced.find().then(advanced => {
            res.status(200).send(JSON.stringify(advanced));
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/advanced/create', (req, res) => {
    var advanced = req.body;
    if (checkAuthorization(req)) {
        models.Advanced.add(advanced.title, advanced.description).then(advanced => {
            res.status(200).send(JSON.stringify(advanced));
        })
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
   
            deviceId = devices[deviceNr].id;
   
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

router.post('/data/addreal', (req, res) => {
    //To be implemented - Add data
    //	console.log(req);
    //console.log("HEJ");
    //console.log(req.body);
    var body = req.body;

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

router.post('/data/remove', (req, res) => {
    var data = req.body;
    if (checkAuthorization(req)) {
        userId = getUserId(req);
        models.Data.remove(data.dataId).then(data => {
           /* console.log("********** data ***********");
            console.log(data);*/
            if(data != -1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
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

router.get('/OTA/update', (req, res) => {
    console.log(path.join(__dirname, '../firmware', 'esp01.bin'));
    //res.sendFile(path.join(__dirname, '../public', 'index1.html'));
    //res.sendFile(path.join(__dirname, '', 'index1.html'));
    res.sendFile(path.join(__dirname, '../firmware', 'esp01.bin'));
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
