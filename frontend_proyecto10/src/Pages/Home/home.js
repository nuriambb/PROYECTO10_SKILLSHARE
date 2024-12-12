import './_home.scss'
import { crearBotones } from '../../Components/Buttons/buttons'
import { Navigate } from '../../Routes/navigate'
import { Talleres } from '../Talleres/talleres'
import { sobreNosotros } from '../SobreNosotros/sobreNosotros'
import { Spinner } from '../../Components/spinner/spinner'
import { apiFetch } from '../../Utils/apiFetch'

export const Home = async () => {
  const main = document.querySelector('main')

  const app2 = document.getElementById('app2')
  app2.innerHTML = ''
  const miniHeader = document.getElementsByClassName('mini-header')[0]
  miniHeader.innerHTML = ''

  main.innerHTML = ''

  const divFondoHome = document.createElement('div')
  divFondoHome.className = 'div-fondo-home'
  const curvaFondo = document.createElement('img')
  curvaFondo.className = 'curva-fondo'
  curvaFondo.src = './assets/amarillo.svg'
  divFondoHome.append(curvaFondo)

  const divHome = document.createElement('div')
  divHome.className = 'div-home'
  divFondoHome.append(divHome)

  const divTexto = document.createElement('div')
  divTexto.className = 'div-texto'
  const h1Skill = document.createElement('h1')
  h1Skill.className = 'h1-skills'
  h1Skill.textContent = 'skillshare'

  const h2Info = document.createElement('h2')
  h2Info.className = 'h2-info'
  h2Info.textContent = 'La web donde podrás aprender y enseñar de todo'
  let { divButtons, button1, button2 } = crearBotones(
    '< Sobre Nosotros',
    'Ver más talleres >'
  )

  button2.addEventListener('click', () => {
    Navigate('Talleres')
  })
  button1.addEventListener('click', () => {
    Navigate('Sobre Nosotros')
  })

  divTexto.append(h1Skill, h2Info, divButtons)
  divHome.appendChild(divTexto)

  const divTalleres = document.createElement('div')
  divTalleres.className = 'div-talleres'
  const talleres = await apiFetch('/talleres')
  console.log(talleres)

  pintarTalleres(talleres, divTalleres)
  const divTalleresItems = divTalleres.querySelectorAll('.div-taller')
  divTalleresItems.forEach((divTaller) => {
    divTaller.addEventListener('click', () => {
      const itemId = divTaller.getAttribute('data-id')
      if (itemId) {
        window.location.href = `#talleres?id=${itemId}`
        Navigate(Talleres(itemId))
      }
    })
  })

  divHome.append(divTalleres)
  main.appendChild(divFondoHome)
}

const pintarTalleres = (talleres, elementoPadre) => {
  const tresTalleres = talleres.slice(0, 4)
  for (const taller of tresTalleres) {
    const divTaller = document.createElement('div')
    divTaller.className = 'div-taller'
    divTaller.setAttribute('data-id', taller._id)
    const divImg = document.createElement('div')
    divImg.className = 'div-img'
    const img = document.createElement('img')
    img.className = 'img-taller'
    const titulo = document.createElement('h3')
    titulo.className = 'titulo-taller'

    img.src = taller.img
    titulo.textContent = taller.titulo
    divImg.append(img)
    divTaller.append(divImg)
    divTaller.append(titulo)
    elementoPadre.append(divTaller)
  }
}
