const { User } = require('../../database/models');
const ClientError = require('../../exceptions/ClientError');
const NotFoundError = require('../../exceptions/NotFoundError');

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

  async getUserPassword(email) {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if(user == null) {
      throw new NotFoundError('User not found')
    } else {
      return user;
    }
  }
}

module.exports = UserService;