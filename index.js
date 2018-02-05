const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

/* Import required libraries */
const mongoose = require("mongoose"),
      morgan = require("morgan"),
      bodyParser = require("body-parser"),
      quizRTAPI = require('./api');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let port = 4030;

/* Create DB Connection */
const mongoConnection = require('./mongoConnection');
mongoConnection.connect();

//Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//Mount the api to consume
app.use(quizRTAPI);

//Listem to port 3030
app.listen(port, () => {
    console.log('App is listening to request on port:', port);
});

module.exports = app;
