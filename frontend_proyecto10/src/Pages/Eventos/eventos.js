import '../Talleres/_tallereseventos.scss'

import { pintarContenido } from '../../Components/pintarContenido/pintarContenido'
import { apiFetch } from '../../Utils/apiFetch'
import { desplegarItemUrl } from '../../Components/desplegarItemUrl/desplegarItemUrl'

export const Eventos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const sectionEventos = document.createElement('section')
  sectionEventos.className = 'section-talleres'

  const divFondo = document.createElement('div')
  divFondo.className = 'div-fondo'
  const imgFondo = document.createElement('img')
  imgFondo.src = './assets/waveamarilla.svg'
  imgFondo.className = 'curva'
  divFondo.append(imgFondo)

  const divContenedorEventos = document.createElement('div')
  divContenedorEventos.className = 'div-contenedor-talleres'
  const h2Eventos = document.createElement('h2')
  h2Eventos.textContent = 'Eventos'

  const divOrganizarEventos = document.createElement('div')
  divOrganizarEventos.className = 'organizar-talleres'

  const token = localStorage.getItem('token')

  const eventos = await apiFetch('/eventos')

  console.log('ya funciona eventos', eventos)

  pintarContenido(eventos, 'evento', divOrganizarEventos).then(() => {
    desplegarItemUrl()
  })

  divContenedorEventos.append(divFondo, h2Eventos, divOrganizarEventos)
  sectionEventos.append(divContenedorEventos)

  main.append(sectionEventos)
}
