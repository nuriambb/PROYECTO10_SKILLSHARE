const { verifyJwt } = require('../utils/jwt')
const User = require('../../src/api/models/user.models')

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: 'No estás autorizado: No se proporcionó un token' })
    }

    const [bearer, token] = req.headers.authorization.split(' ')

    if (bearer !== 'Bearer' || !token) {
      return res
        .status(401)
        .json({ message: 'No estás autorizado: Formato de token inválido' })
    }

    const { id } = verifyJwt(token)

    const user = await User.findById(id)

    if (!user) {
      return res
        .status(401)
        .json({ message: 'No estás autorizado: Usuario no encontrado' })
    }

    user.password = undefined

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'No estás autorizado: Token inválido o expirado',
      error: error.message
    })
  }
}
module.exports = { isAuth }
