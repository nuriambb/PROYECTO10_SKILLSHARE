import './_header.scss'
import { Home } from '../../Pages/Home/home'
import { loginRegister } from '../../Pages/LoginRegister/loginRegister'
import { Talleres } from '../../Pages/Talleres/talleres'
import { Eventos } from '../../Pages/Eventos/eventos'

export const Header = (navigate) => {
  const header = document.querySelector('header')
  const nav = document.createElement('nav')

  const routes = [
    { texto: 'Home', href: '#home', funcion: () => navigate('Home') },

    {
      texto: 'Talleres',
      href: '#talleres',
      funcion: () => navigate('Talleres')
    },
    { texto: 'Eventos', href: '#eventos', funcion: () => navigate('Eventos') },
    {
      texto: 'Mi Espacio',
      href: '#perfil',
      funcion: () => navigate('Mi Espacio')
    }
  ]

  for (const route of routes) {
    const a = document.createElement('a')
    a.textContent = route.texto
    a.href = route.href
    a.addEventListener('click', (e) => {
      e.preventDefault()
      route.funcion()
    })
    nav.append(a)
  }

  header.append(nav)
}
