import './prehome.scss'
import { Register } from '../LoginRegister/register'

export const preHome = async () => {
  const app = document.querySelector('#app')
  app.id = 'app'
  const app2 = document.querySelector('#app2')
  app2.id = 'app2'

  const miniHeader = document.createElement('div')
  miniHeader.className = 'mini-header'
  miniHeader.innerHTML = `<p> <a href="#login" id="loginlink">Inicia sesión</a> si ya estás registrado</p>`
  app.append(miniHeader)

  const divPreHome = document.createElement('div')
  divPreHome.className = 'div-prehome'

  const divInfo = document.createElement('div')
  divInfo.className = 'div-info'
  const divTexto = document.createElement('div')
  divTexto.className = 'div-texto'
  const h2Texto = document.createElement('h2')
  h2Texto.className = 'h2-texto'
  h2Texto.textContent =
    '¿Quieres que te ayudemos a encontrar la pieza que falta?'

  const pInteraccion = document.createElement('p')
  pInteraccion.textContent = 'Haz click en el puzle para saber más'

  const buttonPuzzle = document.createElement('button')
  buttonPuzzle.className = 'button-puzzle'

  const imgPuzzle = document.createElement('img')
  imgPuzzle.className = 'img-puzzle'
  imgPuzzle.src = './assets/puzle7.png'
  buttonPuzzle.append(imgPuzzle)
  buttonPuzzle.addEventListener('click', cambiarPrehome2)

  divTexto.append(h2Texto, pInteraccion)
  divInfo.append(divTexto, buttonPuzzle)

  divPreHome.append(divInfo)

  app2.append(divPreHome)
}

const cambiarPrehome2 = () => {
  const app = document.getElementById('app')
  const app2 = document.getElementById('app2')
  app2.innerHTML = ''
  const divPrehome2 = document.createElement('div')
  divPrehome2.className = 'div-prehome2'
  //const imgFondo = document.createElement('img')
  //imgFondo.className = 'img-fondo'
  //imgFondo.src = './assets/fondo2.svg'
  //divPrehome2.append(imgFondo)

  const divInfo2 = document.createElement('div')
  divInfo2.className = 'div-info2'
  const h2Texto2 = document.createElement('h2')
  h2Texto2.className = 'texto2'
  h2Texto2.textContent =
    'Bienvenido a Skillshare, la plataforma donde aprender y enseñar no tiene límites. Encuentra inspiración en cada clase.'

  const gif = document.createElement('img')
  gif.src = './assets/gif.gif'
  gif.className = 'gif'

  const divregistrate = document.createElement('div')
  divregistrate.className = 'div-registrate'
  const aregister = document.createElement('a')
  aregister.textContent = 'Regístrate '
  aregister.href = '#registro'
  aregister.id = 'a-registrate'
  const h2Registrate = document.createElement('h2')
  h2Registrate.textContent = 'y empieza a explorar un mundo de posibiidades.'
  h2Registrate.className = 'h2-registrate'

  divregistrate.append(aregister, h2Registrate)
  const registerFormDiv = document.createElement('div')
  const miniHeader = document.getElementsByClassName('mini-header')

  aregister.addEventListener('click', (evento) => {
    evento.preventDefault()
    divPrehome2.style.display = 'none'
    if (miniHeader[0]) {
      miniHeader[0].style.display = 'none'
    }

    Register(registerFormDiv)
    app.appendChild(registerFormDiv)
  })
  divInfo2.append(h2Texto2, gif, divregistrate)
  divPrehome2.append(divInfo2)
  app2.append(divPrehome2)
}
