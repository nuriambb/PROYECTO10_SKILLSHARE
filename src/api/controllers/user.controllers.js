const User = require('../models/user.models')
const { generateToken } = require('../../utils/jwt')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next) => {
  console.log(req.body)
  try {
    req.body.rol = 'user'
    const saltRounds = 10
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds)
    const user = new User(req.body)
    const userDuplicated = await User.findOne({ email: req.body.email })
    if (userDuplicated) {
      return res
        .status(400)
        .json({ message: 'Este usuario ya está registrado' })
    } else {
      const userSaved = await user.save()
      const token = generateToken(userSaved._id)

      return res.status(200).json({ user: userSaved, token })
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Ha ocurrido un error en el registro',
      error: error.message
    })
  }
}

const loginUser = async (req, res, next) => {
  try {
    console.log('req-body:', req.body)

    const { email, password } = req.body
    const trimmedPassword = await req.body.password.trim().toString()
    const user = await User.findOne({ email })

    console.log(req.body.password)
    console.log('Contraseña ingresada:', password)
    console.log('Hash almacenado en la base de datos:', user.password)

    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          throw err
        }
      })
      if (req.body.password) {
        const token = generateToken(user._id)
        return res.status(200).json({ user, token })
      } else {
        return res.status(400).json({
          message: 'la contraseña no coindice hasheada'
        })
      }
    } else {
      return res.status(400).json('Usuario o contraseña no encontrado')
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Ha ocurrido un error en el login',
      error: error.message
    })
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate('talleresImpartidos', 'titulo')
      .populate('talleresReservados', 'titulo')
      .populate('eventosReservados', 'titulo')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error en el getUsers')
  }
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userRequesting = req.user

    if (userRequesting.rol === 'user' && userRequesting._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: 'No puedes actualizar a otros usuarios' })
    }
    if (userRequesting === 'user' && req.body.rol) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para cambiar el rol' })
    }

    const updates = req.body

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json({
      message: 'Error actualizando el usuario',
      error: error.message
    })
  }
}
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('talleresReservados')
      .populate('eventosReservados')
      .populate('talleresImpartidos')
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' })
  }
}

module.exports = { registerUser, loginUser, getUsers, putUser, getUserProfile }
