import './_loginRegister.scss'
import { Home } from '../Home/home'
import { crearFormulario } from '../../Components/Formulario/formulario'
import { Register } from './register'
import { Spinner } from '../../Components/spinner/spinner'
import { Collage } from '../../Components/collage/collage'

export const loginRegister = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const divFondo = document.createElement('div')
  divFondo.className = 'div-fondo'

  const pageForLogin = document.createElement('div')
  pageForLogin.className = 'page-for-login'

  const divh1 = document.createElement('div')
  divh1.className = 'div-h1'
  const h1nombre = document.createElement('h1')
  h1nombre.className = 'h1-nombre'
  h1nombre.textContent = 'skillshare'
  divh1.append(h1nombre)

  const rutasImagenes = [
    './assets/comida.png',
    './assets/diseño.png',
    './assets/pc.png'
  ]

  const divDesign = Collage(rutasImagenes)
  divDesign.className = 'div-design'

  const loginDiv = document.createElement('div')
  loginDiv.className = 'div-login'
  loginDiv.appendChild(divh1)

  pageForLogin.append(loginDiv, divDesign)
  divFondo.append(pageForLogin)
  Login(loginDiv)

  const registerDiv = document.createElement('div')
  registerDiv.className = 'register-div'
  const pRegister = document.createElement('p')
  pRegister.textContent = '¿Aún no tienes cuenta?'
  const buttonRegister = document.createElement('button')
  buttonRegister.className = 'button-register'
  buttonRegister.textContent = 'Únete'
  registerDiv.append(pRegister, buttonRegister)

  main.appendChild(divFondo)
  loginDiv.append(registerDiv)
  registerDiv.style.display = 'flex'
  const registerFormDiv = document.createElement('div')
  registerFormDiv.className = 'register-form-div'

  Register(registerFormDiv)
  registerFormDiv.style.display = 'none'
  main.appendChild(registerFormDiv)

  buttonRegister.addEventListener('click', () => {
    pageForLogin.style.display = 'none'
    registerFormDiv.style.display = 'block'
    window.location.hash = 'registro'
    divFondo.style.display = 'none'
  })
}

const Login = (elementoPadre) => {
  const form = crearFormulario('¡Bienvenide de nuevo!', elementoPadre)
  form.className = 'form'

  const spinner = Spinner()
   spinner.style.display = 'none'
  form.appendChild(spinner)

  const inputEmail = form.querySelector('input[placeholder="email"]')
  const inputPassword = form.querySelector('input[placeholder="contraseña"]')

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const email = inputEmail.value
    const password = inputPassword.value
    const existingError = form.querySelector('.error-msg')
    if (existingError) {
      existingError.remove()
    }

    if (!email || !password) {
      const pError = document.createElement('p')
      pError.className = 'error-msg'
      pError.textContent = 'El email y la contraseña son obligatorios'
      form.append(pError)

      return
    }

   

    try {
      const res = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      spinner.style.display = 'none'

      if (!res.ok) {
        const errorText = await res.json()
        const pError = document.createElement('p')
        pError.textContent = errorText
        pError.className = 'error-msg'
        form.append(pError)

        return
      }

      const data = await res.json()

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('Inicio de sesión exitoso:', data)
      Home()
    } catch (error) {
      console.error('Error al iniciar sesión:', error)

      spinner.style.display = 'none'
    }
  })
}
