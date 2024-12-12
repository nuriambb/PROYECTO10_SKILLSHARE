const Evento = require('../models/eventos.models')
const { deleteFile } = require('../../utils/deleteFile')
const User = require('../models/user.models')
const mongoose = require('mongoose')
const getEvento = async (req, res, next) => {
  try {
    const eventos = await Evento.find()
    return res.status(200).json(eventos)
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error leyendo los eventos',
      error: error.message
    })
  }
}
const postEvento = async (req, res, next) => {
  try {
    const userRequesting = req.user.rol
    if (userRequesting === 'user') {
      return res.status(400).json('No puedes crear un evento si no eres admin')
    }
    const newEvento = new Evento(req.body)
    if (req.file) {
      newEvento.img = req.file.path
    }
    const eventosSaved = await newEvento.save()
    const eventosSavedName = await Evento.findById(eventosSaved._id)
    return res.status(200).json(eventosSavedName)
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error creando los eventos',
      error: error.message
    })
  }
}

const putEvento = async (req, res, next) => {
  try {
    const userRequesting = req.user.rol
    if (userRequesting === 'user') {
      return res.status(400).json('No puedes editar un evento si no eres admin')
    }
    const { id } = req.params
    const newEvento = new Evento(req.body)
    newEvento._id = id
    if (req.file) {
      newEvento.img = req.file.path
      const oldEvento = await Evento.findById(id)
      deleteFile(oldEvento.img)
    }
    const eventosUpdate = await Evento.findByIdAndUpdate(id, newEvento, {
      new: true
    })
    return res.status(200).json(eventosUpdate)
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error actualizando los eventos',
      error: error.message
    })
  }
}
const deleteEvento = async (req, res, next) => {
  try {
    const userRequesting = req.user.rol
    if (userRequesting === 'user') {
      return res.status(400).json('No puedes editar un evento si no eres admin')
    }
    const { id } = req.params
    const eventos = await Evento.findById(id)
    if (!eventos) {
      return res.status(400).json('No se ha encontrado el eventos')
    }
    await deleteFile(eventos.img)
    const eventosDeleted = await Evento.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Elemento eliminado',
      elemento: eventosDeleted
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error borrando los eventos',
      error: error.message
    })
  }
}
const apuntarseEvento = async (req, res) => {
  console.log('Cuerpo recibido en la solicitud:', req.body)
  const { id } = req.body

  console.log('ID del evento recibido:', id)

  const userId = req.user.id

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de evento no válido' })
    }

    const evento = await Evento.findById(id)
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' })
    }
    const user = await User.findById(userId)
    if (user.eventosReservados.includes(id)) {
      return res.status(400).json({ error: 'Este evento ya ha sido reservado' })
    }

    if (evento.plazas <= 0) {
      return res.status(400).json({ error: 'No hay plazas disponibles' })
    }

    evento.plazas -= 1
    await evento.save()

    user.eventosReservados.push(id)
    await user.save()

    return res.status(200).json({ message: 'Reservado con éxito' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Ha ocurrido un error al reservar el evento',
      error: error.message
    })
  }
}
module.exports = {
  getEvento,
  postEvento,
  putEvento,
  deleteEvento,
  apuntarseEvento
}
