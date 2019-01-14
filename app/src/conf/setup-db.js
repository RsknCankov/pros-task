let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/' + process.env.NAMESPACE, {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected with Database'));
mongoose.connection.on('error', function (err) {
    console.log('Connection to Database failed with - ', err);
    throw err;
});

mongoose.Promise = Promise;

module.exports.mongooseClient = mongoose.mongooseClient;
