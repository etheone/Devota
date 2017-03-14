const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var models = require('../models/models.js');
var fileSystem = require('fs');
var path = require('path');
var secret = 'JBSJqOyxo3zDkgxlCbJoUb2FSZ5F9SrUz20J3uQ4CV5cQY6H6gmKCmPfnUN4-BiT';

router.use(express.static(path.join(__dirname, '../firmware')));
/* GET api listing. */
router.get('/authenticate', (req, res) => {
    var decoded;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.replace("Bearer ", "");
        try {
            decoded = jwt.verify(authorization, secret);
        } catch (e) {
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
            if (news != -1) {
                res.status(200).send(JSON.stringify(news));
            } else {
                res.sendStatus(422);
            }
        })
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/quickstart/find', (req, res) => {
    if (checkAuthorization(req)) {
        models.Quickstart.find().then(quickstart => {
            if (quickstart != -1) {
                res.status(200).send(JSON.stringify(quickstart));
            } else {
                res.sendStatus(422);
            }
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/quickstart/create', (req, res) => {
    var quickstart = req.body;
    if (checkAuthorization(req)) {
        models.Quickstart.add(quickstart.title, quickstart.description).then(quickstart => {
            if (quickstart != -1) {
                res.status(200).send(JSON.stringify(quickstart));
            } else {
                res.sendStatus(422);
            }
        })
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/advanced/find', (req, res) => {
    if (checkAuthorization(req)) {
        models.Advanced.find().then(advanced => {
            if (advanced != -1) {
                res.status(200).send(JSON.stringify(advanced));
            } else {
                res.sendStatus(422);
            }
            
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/advanced/create', (req, res) => {
    var advanced = req.body;
    if (checkAuthorization(req)) {
        models.Advanced.add(advanced.title, advanced.description).then(advanced => {
            if (advanced != -1) {
                res.status(200).send(JSON.stringify(advanced));
            } else {
                res.sendStatus(422);
            }
        })
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/devices/create', (req, res) => {
    var device = req.body;
    var userId;
    if (checkAuthorization(req)) {

        userId = getUserId(req);
        models.Device.add(device.deviceName, device.description, userId).then(device => {
            if (device != -1) {
                res.status(200).send(JSON.stringify(device));
            } else {
                res.sendStatus(422);
            }
        })

    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/devices/find', (req, res) => {

    if (checkAuthorization(req)) {
        userId = getUserId(req);
        models.Device.find(null, userId).then(device => {
            if (device != -1) {
                res.status(200).send(JSON.stringify(device));
            } else {
                res.sendStatus(422);
            }
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.post('/devices/update', (req, res) => {

    if (checkAuthorization(req)) {
        var device = req.body;
        models.Device.edit(device.deviceId, device.deviceName, device.description).then(device => {
            if (device != null) {
                if (device != -1) {
                    res.status(200).send(JSON.stringify(device));
                } else {
                    res.sendStatus(422);
                }
            } else {
                res.sendStatus(400);
            }
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/devices/remove', (req, res) => {

});

router.post('/data/add', (req, res) => {

    var body = req.body;
    var deviceId;
    var userId = getUserId(req);
    models.Device.find(null, userId).then(devices => {
        if (devices != null) {
            var count = devices.length;
            var deviceNr = Math.floor((Math.random() * (count + 1)));

            deviceId = devices[deviceNr].id;

            models.Device.find(deviceId, null).then(device => {
                var data = JSON.stringify(body.data);
                if (device != null) {

                    models.Data.add(deviceId, data).then(data => {
                        if (data != null) {
                            res.sendStatus(200);
                        } else {
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
});

router.post('/data/addreal', (req, res) => {

    var body = req.body;
    var deviceId = body.deviceId;
    delete body["deviceId"];

    models.Device.find(deviceId, null).then(device => {
        if (device != null) {
            models.Device.find(deviceId, null).then(device => {
                var data = JSON.stringify(body.data);
                if (device != null) {

                    models.Data.add(deviceId, data).then(data => {
                        if (data != null) {
                            res.sendStatus(200);
                        } else {
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
});

router.post('/data/remove', (req, res) => {
    var data = req.body;
    if (checkAuthorization(req)) {
        userId = getUserId(req);
        models.Data.remove(data.dataId).then(data => {
            if (data != -1) {
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
            if (data != -1) {
                res.status(200).send(JSON.stringify(data));
            } else {
                res.sendStatus(422);
            }
        });
    } else {
        res.sendStatus(401).send('Unauthorized');
    }
});

router.get('/OTA/update.bin', (req, res) => {
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
        return res.status(401).send('unauthorized');
    }
    return decoded.sub;
}

function checkDeviceId(deviceId) {
    models.Device.find(deviceId, null).then(device => {
        if (device != null) {
            return true;
        } else {
            return false;
        }
    });
}

module.exports = router;
