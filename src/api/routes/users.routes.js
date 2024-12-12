const userRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/isAuth')
const {
  registerUser,
  loginUser,
  getUsers,
  putUser,
  getUserProfile
} = require('../controllers/user.controllers')

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/', [isAuth], getUsers)
userRoutes.put('/:id', [isAuth], putUser)
userRoutes.get('/perfil', [isAuth], getUserProfile)

module.exports = userRoutes
