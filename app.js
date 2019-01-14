const Hapi = require('hapi');    // https://github.com/nelsonic/learn-hapi
const Joi = require('joi');
const app = new Hapi.Server(); //{ debug: {"request": ["error", "uncaught"]} })
const dbSetup = require('./app/src/conf/setup-db');

app.connection({port: process.env.PORT});
app.start(function () {
    console.log('Visit: http://127.0.0.1:' + app.info.port);
});

module.exports = app;
