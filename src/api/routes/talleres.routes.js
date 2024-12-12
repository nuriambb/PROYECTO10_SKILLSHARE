const talleresRoutes = require('express').Router()
const {
  getTaller,
  postTaller,
  putTaller,
  deleteTaller,
  apuntarseTaller,
  desapuntarseTaller,
  getTalleresByUser
} = require('../controllers/talleres.controllers')
const upload = require('../../middlewares/file')
const { isAuth } = require('../../middlewares/isAuth')

talleresRoutes.get('/', getTaller)
talleresRoutes.post('/', [isAuth], upload.single('img'), postTaller)
talleresRoutes.put('/:id', [isAuth], upload.single('img'), putTaller)
talleresRoutes.delete('/:id', [isAuth], deleteTaller)
talleresRoutes.post('/apuntarse/', [isAuth], apuntarseTaller)
talleresRoutes.post('/desapuntarse/', [isAuth], desapuntarseTaller)
talleresRoutes.get('/user-talleres', [isAuth], getTalleresByUser)

module.exports = talleresRoutes
