const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();

// connection to mongodb
mongoose.connect('mongodb://localhost/wan');

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.hedaer('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});

app.use('/api', router);

const server = app.listen(8080, () => {
    console.log('Сервер запущен. Порт: 8080');
});

module.exports = server;
