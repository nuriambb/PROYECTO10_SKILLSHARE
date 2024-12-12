import { crearFormulario } from '../../Components/Formulario/formulario'
import { Home } from '../Home/home'
import './_loginRegister.scss'
import { Spinner } from '../../Components/spinner/spinner'

export const Register = (elementoPadre) => {
  //const main = document.querySelector('main')
  //main.innerHTML = ''
  elementoPadre.innerHTML = ''

  const registserPage = document.createElement('div')
  registserPage.className = 'register-only'

  const divFondo = document.createElement('div')
  divFondo.className = 'div-fondo'

  const registerDivFondo = document.createElement('div')
  registerDivFondo.className = 'page-for-login'

  const registerFormDiv = document.createElement('div')
  registerFormDiv.className = 'div-login'
  const divh1 = document.createElement('div')
  divh1.className = 'div-h1'
  const h1nombre = document.createElement('h1')
  h1nombre.className = 'h1-nombre'
  h1nombre.textContent = 'skillshare'
  divh1.append(h1nombre)
  registerFormDiv.append(divh1)

  const divDesign = document.createElement('div')
  divDesign.className = 'div-design'

  const imgPrueba = document.createElement('img')
  imgPrueba.className = 'img-register'
  imgPrueba.src = './assets/redes.png'
  divDesign.append(imgPrueba)

  registerDivFondo.append(registerFormDiv, divDesign)
  divFondo.append(registerDivFondo)
  registserPage.append(divFondo)

  const form = crearFormulario('Registrarse', elementoPadre, { nombre: true })
  form.className = 'form-register'

  const errorMsg = document.createElement('p')
  errorMsg.className = 'error-msg'
  errorMsg.style.display = 'none'
  form.appendChild(errorMsg)

  const spinner = Spinner()
  spinner.style.display = 'none'
  form.appendChild(spinner)

  const inputName = form.querySelector('input[placeholder="nombre"]')
  const inputEmail = form.querySelector('input[placeholder="email"]')
  const inputPassword = form.querySelector('input[placeholder="contraseña"]')

  const showError = (message) => {
    errorMsg.textContent = message
    errorMsg.style.display = 'flex'
    spinner.style.display = 'none'
  }

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const name = inputName.value.trim()
    const email = inputEmail.value.trim()
    const password = inputPassword.value.trim()

    if (!name || !email || !password) {
      showError('El nombre, el email y la contraseña son obligatorios.')
      return
    }

    if (password.length < 10) {
      showError('La contraseña debe tener al menos 10 caracteres.')
      return
    }

    errorMsg.style.display = 'none'
    spinner.style.display = 'flex'

    try {
      const res = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      spinner.style.display = 'none'

      if (!res.ok) {
        const errorData = await res.json()
        if (errorData.message.includes('Este usuario ya está registrado')) {
          showError('El usuario ya está registrado.')
        } else {
          showError('Error en la solicitud de registro.')
        }
        return
      }

      const data = await res.json()
      console.log('Token:', data.token)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('token', data.token)
      console.log('Registro exitoso:', data)
      registserPage.style.display = 'none'
      Home()
    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      showError('Error al registrar el usuario.')
      spinner.style.display = 'none'
    }
  })
  registerFormDiv.append(form)

  elementoPadre.appendChild(registserPage)
}
