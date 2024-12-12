const mongoose = require('mongoose')

const tallerSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    img: { type: String, required: false, trim: true },
    descripcion: { type: String, required: true, trim: true },
    modalidad: { type: String, required: true, trim: true },
    plazas: { type: Number, required: true, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false
    },
    duracion: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'talleres'
  }
)

const Taller = mongoose.model('talleres', tallerSchema, 'talleres')
module.exports = Taller
