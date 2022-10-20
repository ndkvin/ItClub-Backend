const { User } = require('../../database/models');
const ClientError = require('../../exceptions/ClientError');

class UserService {
  async createUser(email, password) {
    const res = await User.create({
      email,
      password
    }).catch((e) => {
      console.log(e.message);
      throw new ClientError(e.message)
    });
    return res;
  }
}

module.exports = UserService;