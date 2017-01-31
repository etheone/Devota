// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('express-jwt');

// Get our API routes
const api = require('./server/routes/api');

const app = express();
var models = require('./server/models/models.js');

app.use(cors());

//var pFn = require('./server/db/db');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


//Check if token is valid
const authCheck = jwt({
  secret: new Buffer('JBSJqOyxo3zDkgxlCbJoUb2FSZ5F9SrUz20J3uQ4CV5cQY6H6gmKCmPfnUN4-BiT', 'base64'),
  audience: 'VHnXH58XGAL7XOfqUs8cjY8cMMt'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

models.sequelize.sync().then(function() {
  server.listen(port, () => console.log(`API running on localhost:${port}`));
});

