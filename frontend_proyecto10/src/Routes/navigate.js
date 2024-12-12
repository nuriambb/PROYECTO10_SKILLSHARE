import { Eventos } from '../Pages/Eventos/eventos'
import { Home } from '../Pages/Home/home'
import { sobreNosotros } from '../Pages/SobreNosotros/sobreNosotros'
import { Talleres } from '../Pages/Talleres/talleres'
import { miEspacio } from '../Pages/miEspacio/miEspacio'
//import { Spinner } from '../Components/spinner/spinner'
import { preHome } from '../Pages/Prehome/prehome'

export const Navigate = async (page) => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  //const spinner = Spinner()
  //spinner.style.display = 'flex'
  //main.appendChild(spinner)

  const url = `#${page.toLowerCase().replace(/\s+/g, '-')}`
  window.history.pushState({}, page, url)
  localStorage.setItem('currentPage', page)

  try {
    switch (page) {
      case 'Prehome':
        await preHome()
        break
      case 'Home':
        await Home()
        break
      case 'Mi Espacio':
        await miEspacio()
        break
      case 'Talleres':
        await Talleres()
        break
      case 'Eventos':
        await Eventos()
        break
      case 'Sobre Nosotros':
        await sobreNosotros()
        break
      default:
        await Home()
    }
  } catch (error) {
    console.error('Error al navegar:', error)
  } finally {
    // spinner.style.display = 'none'
  }
}
