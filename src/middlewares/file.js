const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = 'Proyecto10'

    return {
      folder: folderName,
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif']
    }
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }
})
module.exports = upload
