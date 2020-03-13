const UserRepository = require('../repository/user.repository');
const User = require('../model/user');

const userRepository = new UserRepository('0');

module.exports.getAllUser = async () => await userRepository.findAll();

module.exports.getUserById = async (userId) => {
    userRepository.entityId = userId;
    return await userRepository.findById();
};

module.exports.saveUser = async (body) => {
    const id = await userRepository.save(new User(body.name, body.surname, body.email));
    return await this.getUserById(id);
};

module.exports.updateUser = async (body) => {
    const user = new User(body.name, body.surname, body.email, body.id);
    await userRepository.update(user);
    return await this.getUserById(user.id);
};
