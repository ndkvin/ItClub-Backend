const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/postgres/users');
const ClientError = require('../../exceptions/ClientError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

const userService = new UserService();
userRouter.post('/signup', async (req,res)=> {
  try {
    let { email, password } = req.body;

    const { id } = await userService.createUser(email,password);
    res.status(201);
    res.json({
      status: 'created',
      data: {
        id,
      }
    })
  } catch (e) {
    if (e instanceof ClientError) {
      res.status(400);
      res.json({
        status: 'error',
        message: e.message
      })
      return
    }
    console.error(e);
    res.status(500);
    res.json({
      status: 'error',
      message: 'internal server error'
    })
  }
});

userRouter.post('/signin', async(req,res) => {
  try {
    const { email, password: plainPassword } = req.body;
    const { id, password }= await userService.getUserPassword(email);

    const result = await bcrypt.compare(plainPassword, password);

    if(!result) {
      throw new AuthenticationError('Credential not match');
    }

    const payload = {
      id,
    }
    const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '5m' })
    res.json({
      status: "Success loge in",
      data: {
        accessToken,
      }
    })
  } catch(e) {
    if(e instanceof AuthenticationError) {
      res.status(401).json({
        status: "Authentication Error",
        message: e.message
      });
      return;
    }

    if(e instanceof NotFoundError) {
      res.status(404).json({
        status: "Not Found",
        message: e.message
      });
      return;
    }
    console.log(e.message);
    res.status(500).json({
      status: "Server error",
      message: 'Internal server error'
    });
    return
  }
});


module.exports = userRouter;