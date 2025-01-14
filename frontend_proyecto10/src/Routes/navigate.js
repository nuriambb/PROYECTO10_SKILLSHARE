import { Eventos } from '../Pages/Eventos/eventos'
import { Home } from '../Pages/Home/home'
import { sobreNosotros } from '../Pages/SobreNosotros/sobreNosotros'
import { Talleres } from '../Pages/Talleres/talleres'
import { miEspacio } from '../Pages/miEspacio/miEspacio'
import { Register } from '../Pages/LoginRegister/register'
import { preHome } from '../Pages/Prehome/prehome'
import { loginRegister } from '../Pages/LoginRegister/loginRegister'

window.addEventListener('popstate', () => {
  const hash = window.location.hash.slice(1)
  const page = hash || 'home'
  Navigate(page)
})

export const Navigate = async (pageOrObject) => {
  const header = document.querySelector('header')

  const main = document.querySelector('main')

  main.innerHTML = ''

  let targetPage = null
  let id = null

  if (targetPage === 'login' || targetPage === 'registro') {
    header.style.display = 'none'
  } else {
    header.style.display = 'block'
  }
  if (typeof pageOrObject === 'string') {
    targetPage = pageOrObject
  } else if (typeof pageOrObject === 'object' && pageOrObject !== null) {
    targetPage = pageOrObject.page || null
    id = pageOrObject.id || null
  } else {
    console.error('El argumento "pageOrObject" no es válido:', pageOrObject)
    return
  }

  if (!targetPage) {
    console.error('No se proporcionó una página válida para navegar.')
    return
  }

  const url = `#${targetPage.toLowerCase().replace(/\s+/g, '-')}`
  if (id) {
    window.history.pushState({}, targetPage, `${url}?id=${id}`)
  } else {
    if (
      window.location.hash ===
      `#${targetPage.toLowerCase().replace(/\s+/g, '-')}`
    ) {
      window.history.replaceState({}, targetPage, `${url}`)
    } else {
      window.history.pushState({}, targetPage, `${url}`)
    }
  }
  localStorage.setItem('currentPage', targetPage)

  try {
    console.log(
      `Navegando a la página: ${targetPage}${id ? ` con ID: ${id}` : ''}`
    )
    switch (targetPage) {
      case 'home':
        await Home()
        break
      case 'talleres':
        await Talleres(id)
        break
      case 'eventos':
        await Eventos(id)
        break
      case 'mi-espacio':
        await miEspacio()
        break
      case 'sobre-nosotros':
        await sobreNosotros()
        break
      case 'prehome':
        await preHome()
        break
      case 'login':
        await loginRegister()
        break
      case 'registro':
        await Register(main)
        break
      default:
        await Home()
    }
  } catch (error) {
    console.error('Error al navegar:', error)
  }
}
