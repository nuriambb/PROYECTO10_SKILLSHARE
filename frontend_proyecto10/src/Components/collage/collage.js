
export const Collage = (imagenes) => {
  const divDesign = document.createElement('div')
  divDesign.className = 'div-design'

  imagenes.forEach((src, index) => {
    const img = document.createElement('img')
    img.className = `img${index + 1}` 
    img.src = src
    divDesign.appendChild(img)
  })

  return divDesign
}
