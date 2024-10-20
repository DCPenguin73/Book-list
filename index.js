const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes/routes-index'));

    mongodb.initDb((err) => {
        if (err) {
            console.log(err);
        } else {
            app.listen(port);
            console.log(`Server running on port ${port}`);
        }
    });