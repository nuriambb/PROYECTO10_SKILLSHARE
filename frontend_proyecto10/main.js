import './main.scss'
import { preHome } from './src/Pages/Prehome/prehome'
import { Header } from './src/Components/Header/header'
import { Home } from './src/Pages/Home/home'
import { loginRegister } from './src/Pages/LoginRegister/loginRegister'
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
  Navigate('Home')
  preHome()
}

Main()

const renderHome = () => {
  const app = document.querySelector('#app')
  const header = document.createElement('header')
  const main = document.querySelector('main')

  app.insertBefore(header, main)
  Header()
  Home()
}
document.addEventListener('DOMContentLoaded', () => {
  const loginkink = document.getElementById('loginlink')
  const prehome = document.getElementsByClassName('div-prehome')
  const prehome2 = document.getElementsByClassName('div-prehome2')
  const miniHeader = document.getElementsByClassName('mini-header')

  loginkink.addEventListener('click', () => {
    if (prehome.length > 0) {
      prehome[0].style.display = 'none'
    }
    if (prehome2.length > 0) {
      prehome2[0].style.display = 'none'
    }
    if (miniHeader.length > 0) {
      miniHeader[0].style.display = 'none'
    }
    loginRegister().then((isAuthenticated) => {
      if (isAuthenticated) {
        renderHome()
      }
    })
  })
})
