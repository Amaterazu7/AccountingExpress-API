const UserRepository = require('../repository/user.repository');
const User = require('../model/user');

const userRepository = new UserRepository('0');

module.exports.getAllUser = async () => await userRepository.findAll();

module.exports.getUserById = async (userId) => await userRepository.findById(userId);

module.exports.saveUser = async (body) => {
    const id = await userRepository.save(new User(body.name, body.surname, body.email));
    return await userRepository.findById(id);
};

module.exports.updateUser = async (body) => {
    const user = new User(body.name, body.surname, body.email);
    user.modificationDate = new Date();
    await userRepository.update(user);
    return await userRepository.findById(user.id);
};
