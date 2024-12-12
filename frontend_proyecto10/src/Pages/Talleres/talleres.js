import './_tallereseventos.scss'

import { pintarContenido } from '../../Components/pintarContenido/pintarContenido'
import { apiFetch } from '../../Utils/apiFetch'
import { desplegarItemUrl } from '../../Components/desplegarItemUrl/desplegarItemUrl'

export const Talleres = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const sectionTalleres = document.createElement('section')
  sectionTalleres.className = 'section-talleres'
  const divFondo = document.createElement('div')
  divFondo.className = 'div-fondo'

  const waveFondo = document.createElement('img')
  waveFondo.src = './assets/amarillo.svg'
  waveFondo.className = 'curva'
  const divRepeat = document.createElement('div')
  divRepeat.className = 'div-repeat'

  divFondo.append(waveFondo, divRepeat)

  const divContenedorTalleres = document.createElement('div')
  divContenedorTalleres.className = 'div-contenedor-talleres'
  const h2Talleres = document.createElement('h2')
  h2Talleres.textContent = 'Talleres'
  const divOrganizarTalleres = document.createElement('div')
  divOrganizarTalleres.className = 'organizar-talleres'

  const talleres = await apiFetch('/talleres')
  console.log('ya funciona', talleres)
  talleres.forEach((taller) => {
    const tallerElement = document.createElement('div')
    tallerElement.className = 'taller-item'
    tallerElement.id = `taller-${taller._id}`
  })

  pintarContenido(talleres, 'taller', divOrganizarTalleres)
  desplegarItemUrl()

  divContenedorTalleres.append(divFondo, h2Talleres, divOrganizarTalleres)
  sectionTalleres.append(divContenedorTalleres)
  main.append(sectionTalleres)
}
