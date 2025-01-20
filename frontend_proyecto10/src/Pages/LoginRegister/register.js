import { crearFormulario } from '../../Components/Formulario/formulario'
import { Home } from '../Home/home'
import { apiFetch } from '../../Utils/apiFetch'
import { Navigate } from '../../Routes/navigate'
import './_loginRegister.scss'

export const Register = (elementoPadre) => {
  elementoPadre.innerHTML = ''
  const header = document.querySelector('header')
  if (header) {
    header.style.display = 'none'
  }

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

  const form = crearFormulario(
    'Registrarse',
    elementoPadre,
    { nombre: true },
    'registro'
  )
  form.className = 'form-register'

  const errorMsg = document.createElement('p')
  errorMsg.className = 'error-msg'
  errorMsg.style.display = 'none'
  form.appendChild(errorMsg)

  const inputName = form.querySelector('input[placeholder="nombre"]')
  const inputEmail = form.querySelector('input[placeholder="email"]')
  const inputPassword = form.querySelector('input[placeholder="contraseña"]')

  const showError = (message) => {
    errorMsg.textContent = message
    errorMsg.style.display = 'flex'
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

    try {
      const res = await apiFetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      console.log('Respuesta de la API:', res)
      if (
        res &&
        res.message &&
        res.message.includes('Este usuario ya está registrado')
      ) {
        showError('El usuario ya está registrado.')
        return
      }

      if (res && res.token && res.user) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('token', res.token)

        console.log('Registro exitoso:', res)
        registserPage.style.display = 'none'
        Navigate('home')
      } else {
        showError('Error en la solicitud de registro.')
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      showError('Error al registrar el usuario.')
    }

    errorMsg.style.display = 'none'
  })

  registerFormDiv.append(form)

  elementoPadre.appendChild(registserPage)
}
