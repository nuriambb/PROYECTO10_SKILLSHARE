import './_header.scss'
import { Home } from '../../Pages/Home/home'
import { loginRegister } from '../../Pages/LoginRegister/loginRegister'
import { Talleres } from '../../Pages/Talleres/talleres'
import { Eventos } from '../../Pages/Eventos/eventos'

export const Header = (navigate) => {
  const header = document.querySelector('header')
  const nav = document.createElement('nav')
  const burgerButton = document.createElement('button')

  burgerButton.classList.add('burger-button')
  burgerButton.innerHTML = '&#9776;'
  header.append(burgerButton)

  const routes = [
    { texto: 'Home', href: '#home', funcion: () => navigate('home') },

    {
      texto: 'Talleres',
      href: '#talleres',
      funcion: () => navigate('talleres')
    },
    { texto: 'Eventos', href: '#eventos', funcion: () => navigate('eventos') },
    {
      texto: 'Mi Espacio',
      href: '#mi-espacio',
      funcion: () => navigate('mi-espacio')
    }
  ]

  for (const route of routes) {
    const a = document.createElement('a')
    a.textContent = route.texto
    a.href = route.href
    a.addEventListener('click', (e) => {
      e.preventDefault()
      console.log('Ruta clickeada:', route.texto)
      route.funcion()
    })
    nav.append(a)
  }

  header.append(nav)
  burgerButton.addEventListener('click', () => {
    nav.classList.toggle('hidden') 
  })
}
