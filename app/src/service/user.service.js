const userRepository = require('app/src/repository/user.repository');

module.exports.getUserById = ((id) => {
    return userRepository.findById(id);
});

module.exports.getUserByUsername = ((username) => {
    return userRepository.findByUserName(username);
});

module.exports.createUser = ((userData) => {
    return userRepository.create(userData);
});

module.exports.validateUserForLogin = ((userCredentials) => {

});

module.exports.userList = ((page, size, searchString) => {
    return userRepository.list(page, size, searchString);
});
