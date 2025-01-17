const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    rol: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true
    },
    talleresReservados: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'talleres',
        required: false,
        default: null
      }
    ],
    eventosReservados: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventos',
        required: false,
        default: null
      }
    ],
    talleresImpartidos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'talleres',
        required: false,
        default: null
      }
    ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
