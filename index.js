
const express = require('express');
const app = express();
var swaggerTools = require('swagger-tools');
var YAML = require('yamljs');
var swaggerDoc = YAML.load('openapi.yaml');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/main');
const router = require('./routes/index');
const morgan = require('morgan');
const logger = require('./logger');

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
router(app);
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));
app.use(function(req, res, next){
    logger.error('404 page requested');
    res.status(404).send('This page does not exist!');
});
const server = app.listen(config.port);

module.exports = server