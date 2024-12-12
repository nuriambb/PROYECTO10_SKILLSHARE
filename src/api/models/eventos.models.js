const mongoose = require('mongoose')

const eventoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    modalidad: { type: String, required: true, trim: true },
    plazas: { type: Number, required: true, trim: true },
    duracion: { type: String, required: true, trim: true },
    fecha: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'eventos'
  }
)

const Evento = mongoose.model('eventos', eventoSchema, 'eventos')
module.exports = Evento
