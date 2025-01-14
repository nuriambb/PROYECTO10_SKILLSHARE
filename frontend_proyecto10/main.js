import './main.scss'
import { preHome } from './src/Pages/Prehome/prehome'
import { Header } from './src/Components/Header/header'
import { Home } from './src/Pages/Home/home'
import { loginRegister } from './src/Pages/LoginRegister/loginRegister'
import { Footer } from './src/Components/footer/footer'
/*import { Talleres } from './src/Pages/Talleres/talleres'
import { Eventos } from './src/Pages/Eventos/eventos'
import { miEspacio } from './src/Pages/miEspacio/miEspacio'
import { Register } from './src/Pages/LoginRegister/register'*/
import { Navigate } from './src/Routes/navigate'

const Main = () => {
  const app = document.querySelector('#app')
  const header = document.createElement('header')
  const main = document.createElement('main')
  app.appendChild(header)
  app.appendChild(main)

  Header(Navigate)

  preHome()
}

Main()
Footer()

document.addEventListener('click', (evento) => {
  const target = evento.target

  if (target.id === 'loginlink') {
    const prehome = document.querySelector('.div-prehome')
    const prehome2 = document.querySelector('.div-prehome2')
    const miniHeader = document.querySelector('.mini-header')

    if (prehome) prehome.style.display = 'none'
    if (prehome2) prehome2.style.display = 'none'
    if (miniHeader) miniHeader.style.display = 'none'

    loginRegister()
  }
})
