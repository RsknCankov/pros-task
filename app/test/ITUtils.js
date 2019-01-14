module.exports.setTestEnv = (() => {
    process.env.SECRET = 'test';
});

module.export.setDevEnv = (() => {
    process.env.NODE_ENV = 'development';
    process.env.DBHOST = '127.0.0.1';
    process.env.NAMESPACE = 'wmp-node';
    process.env.SECRET = 'test';
});
