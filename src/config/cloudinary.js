require('dotenv').config()
const cloudinary = require('cloudinary').v2

const connectCloudinary = () => {
  if (
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    })
  ) {
    console.log('Cloudinary funciona ✅')
  } else {
    console.log('No funciona Cloudinary ❌')
  }
}

module.exports = { connectCloudinary }
