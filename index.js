const express = require('express')
const { connectDB } = require('./src/config/db')
const { connectCloudinary } = require('./src/config/cloudinary')
const userRoutes = require('./src/api/routes/users.routes')
const eventosRoutes = require('./src/api/routes/eventos.routes')
const talleresRoutes = require('./src/api/routes/talleres.routes')
const cors = require('cors')

connectDB()

connectCloudinary()

const app = express()
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/eventos', eventosRoutes)
app.use('/api/v1/talleres', talleresRoutes)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})
app.listen(3000, () => {
  console.log('Conectado en http://localhost:3000')
})
