const cloudinary = require('cloudinary').v2
const deleteFile = async (url) => {
  try {
    const imgSplited = url.split('/')
    const folderName = imgSplited.at(-2)
    const fileName = imgSplited.at(-1).split('.')[0]
    const result = await cloudinary.uploader.destroy(
      `${folderName}/${fileName}`
    )
    if (result.result !== 'ok') {
      throw new Error(`Error al eliminar la imagen: ${result.result}`)
    }

    console.log('Imagen destruida correctamente de Cloudinary 😈')
  } catch (error) {
    console.log('Error al eliminar la imagen de Cloudinary', error.message)
  }
}

module.exports = { deleteFile }
