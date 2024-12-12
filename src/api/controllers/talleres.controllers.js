const Taller = require('../models/talleres.models')
const { deleteFile } = require('../../utils/deleteFile')
const User = require('../models/user.models')
const mongoose = require('mongoose')
const getTaller = async (req, res, next) => {
  try {
    const talleres = await Taller.find().populate('user', 'id name')

    return res.status(200).json(talleres)
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error leyendo los talleres',
      error: error.message
    })
  }
}
const postTaller = async (req, res, next) => {
  try {
    console.log(req.body)

    const userRequesting = req.user

    if (!userRequesting || !userRequesting._id) {
      return res.status(401).json('Usuario no autenticado')
    }

    const newTaller = new Taller({ ...req.body, user: userRequesting._id })
    if (req.file) {
      newTaller.img = req.file.path
    }
    const talleresSaved = await newTaller.save()
    const user = await User.findById(userRequesting._id)
    if (user) {
      user.talleresImpartidos.push(talleresSaved._id)
      await user.save()
    }
    const talleresSavedName = await Taller.findById(talleresSaved._id)

    return res.status(200).json(talleresSavedName)
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error creando los talleres',
      error: error.message
    })
  }
}

const putTaller = async (req, res, next) => {
  try {
    const userRequesting = req.user

    if (!userRequesting || !userRequesting._id) {
      return res.status(401).json('Usuario no autenticado')
    }

    const { id } = req.params
    const oldTaller = await Taller.findById(id)
    if (!oldTaller) {
      return res.status(404).json('Taller no encontrado')
    }
    if (oldTaller.user.toString() !== userRequesting._id.toString()) {
      return res
        .status(400)
        .json('No puedes actualizar talleres de otros usuarios')
    }

    if (req.file) {
      deleteFile(oldTaller.img)
      req.body.img = req.file.path
    }

    const talleresUpdate = await Taller.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    return res.status(200).json(talleresUpdate)
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error actualizando los talleres',
      error: error.message
    })
  }
}
const deleteTaller = async (req, res, next) => {
  try {
    const userRequesting = req.user

    if (!userRequesting || !userRequesting._id) {
      return res.status(401).json('Usuario no autenticado')
    }
    const { id } = req.params
    const oldTaller = await Taller.findById(id)
    if (!oldTaller) {
      return res.status(404).json('Taller no encontrado')
    }
    if (oldTaller.user.toString() !== userRequesting._id.toString()) {
      return res.status(400).json('No puedes borrar talleres de otros usuarios')
    }

    if (req.file) {
      await deleteFile(talleres.img)
    }

    const talleresDeleted = await Taller.findByIdAndDelete(id)

    await User.updateMany(
      { talleresImpartidos: id },
      { $pull: { talleresImpartidos: id } }
    )
    return res.status(200).json({
      message: 'Elemento eliminado',
      elemento: talleresDeleted
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Hay un error borrando los talleres',
      error: error.message
    })
  }
}

const apuntarseTaller = async (req, res) => {
  console.log('Cuerpo recibido en la solicitud:', req.body)
  const { id } = req.body

  console.log('ID del taller recibido:', id)

  const userId = req.user.id

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de taller no válido' })
    }

    const taller = await Taller.findById(id)
    if (!taller) {
      return res.status(404).json({ error: 'Taller no encontrado' })
    }
    const user = await User.findById(userId)
    if (user.talleresReservados.includes(id)) {
      return res.status(400).json({ error: 'Este taller ya ha sido reservado' })
    }

    if (taller.plazas <= 0) {
      return res.status(400).json({ error: 'No hay plazas disponibles' })
    }

    taller.plazas -= 1
    await taller.save()

    user.talleresReservados.push(id)
    await user.save()

    return res.status(200).json({ message: 'Reservado con éxito' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Ha ocurrido un error al reservar el taller'
    })
  }
}

const desapuntarseTaller = async (req, res) => {
  const { id } = req.body 
  const userId = req.user.id // id del usuario autenticado

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de taller no válido' })
    }

    const taller = await Taller.findById(id)
    if (!taller) {
      return res.status(404).json({ error: 'Taller no encontrado' })
    }

 
    const user = await User.findById(userId)

  
    if (!user.talleresReservados.includes(id)) {
      return res
        .status(400)
        .json({ error: 'Este taller no está reservado por el usuario' })
    }

   
    taller.plazas += 1
    await taller.save()

 
    user.talleresReservados = user.talleresReservados.filter(
      (tallerReservado) => tallerReservado.toString() !== id
    )
    await user.save()

    return res.status(200).json({ message: 'Desapuntado con éxito' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Ha ocurrido un error al desapuntarse del taller',
      error: error.message
    })
  }
}

const getTalleresByUser = async (req, res, next) => {
  try {
    const userRequesting = req.user

    if (!userRequesting || !userRequesting._id) {
      return res.status(401).json('Usuario no autenticado')
    }

    const talleres = await Taller.find({ user: userRequesting._id })

    if (!talleres) {
      return res.status(404).json('No se encontraron talleres')
    }

    return res.status(200).json(talleres)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener los talleres',
      error: error.message
    })
  }
}

module.exports = {
  getTaller,
  postTaller,
  putTaller,
  deleteTaller,
  apuntarseTaller,
  desapuntarseTaller,
  getTalleresByUser
}
