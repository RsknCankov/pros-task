const UserModel = require('app/src/model/user.model');

module.exports.create = ((username, password) => {
    let userData = {username, salt: UserModel.makeSalt(), hashedPassword: UserModel.encryptPassword()};
    return new Promise((resolve, reject) => {
        new UserModel(userData).save().then((callBack) => {
            resolve(callBack);
        }).catch((err) => {
            reject(err);
        });
    });
});

module.exports.findById = ((id) => {
    return UserModel.findById(id).select('salt', 'hashedPassword');
});

module.exports.findByUserName = ((username) => {
    return UserModel.find({username: username}).select('salt', 'hashedPassword');
});

module.exports.validateForLogin = ((username, password) => {

});

module.exports.list = ((page, size, searchString) => {
    let searchObj = (searchString && searchString.length > 0) ? {
        username: {
            '$regex': searchString,
            '$options': 'i'
        }
    } : {};
    return UserModel.find(searchObj).skip(page * size).limit(parseInt(size));
});
