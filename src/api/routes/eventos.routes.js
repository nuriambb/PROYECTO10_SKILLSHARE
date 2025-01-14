const eventosRoutes = require('express').Router()
const {
  getEvento,
  postEvento,
  putEvento,
  deleteEvento,
  apuntarseEvento,
  desapuntarseEvento
} = require('../controllers/eventos.controllers')
const { isAuth } = require('../../middlewares/isAuth')
const upload = require('../../middlewares/file')

eventosRoutes.get('/', [isAuth], getEvento)
eventosRoutes.post('/', [isAuth], upload.single('img'), postEvento)
eventosRoutes.put('/:id', [isAuth], upload.single('img'), putEvento)
eventosRoutes.delete('/:id', [isAuth], deleteEvento)
eventosRoutes.post('/apuntarse', [isAuth], apuntarseEvento)
eventosRoutes.post('/desapuntarse', [isAuth], desapuntarseEvento)

module.exports = eventosRoutes
