const userRouter = require('express').Router();
const UserService = require('../../services/postgres/users');
const ClientError = require('../../exceptions/ClientError');

const userService = new UserService();
userRouter.post('/', async (req,res)=> {
  try {
    const { email, password } = req.body;
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

userRouter.get('/:id', async(req,res)=> {
  const result = userService.getUser(req.params.id);
  req.send(result);
});


module.exports = userRouter;