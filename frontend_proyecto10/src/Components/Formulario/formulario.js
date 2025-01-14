import './_formulario.scss'
import { apiFetch } from '../../Utils/apiFetch'
export const crearFormulario = (titulo, elementoPadre, opciones = {}, tipo) => {
  const form = document.createElement('form')
  const title = document.createElement('h2')
  title.textContent = titulo
  form.appendChild(title)

  const inputContainer = document.createElement('div')
  inputContainer.className = 'input-container'

  if (opciones.nombre) {
    const inputName = document.createElement('input')
    inputName.setAttribute('type', 'text')
    inputName.setAttribute('placeholder', 'nombre')
    inputName.setAttribute('name', 'name')
    inputName.setAttribute('autocomplete', 'name')
    inputContainer.appendChild(inputName)
  }

  const inputEmail = document.createElement('input')
  inputEmail.setAttribute('type', 'email')
  inputEmail.setAttribute('placeholder', 'email')
  inputEmail.setAttribute('name', 'email')
  inputEmail.setAttribute('autocomplete', 'email')
  inputContainer.appendChild(inputEmail)

  const inputPassword = document.createElement('input')
  inputPassword.setAttribute('type', 'password')
  inputPassword.setAttribute('placeholder', 'contraseña')
  inputPassword.setAttribute('name', 'password')
  inputPassword.setAttribute('autocomplete', 'current-password')
  inputContainer.appendChild(inputPassword)
  form.appendChild(inputContainer)

  const submitButton = document.createElement('button')
  submitButton.setAttribute('type', 'submit')

  if (tipo === 'registro') {
    submitButton.textContent = 'Regístrate'
  } else {
    submitButton.textContent = 'Iniciar sesión'
  }
  form.appendChild(submitButton)
  elementoPadre.appendChild(form)
  return form
}

export const crearFormularioTaller = () => {
  const formContainer = document.createElement('div')
  formContainer.className = 'crear-taller-container'

  const form = document.createElement('form')
  form.innerHTML = `
    <div class="input-container">
      <input type="text" id="titulo" placeholder="Título del taller" required />
    </div>
    <div class="input-container">
      <input type="file" id="img" accept="image/*" />
    </div>
    <div class="input-container">
      <textarea id="descripcion" placeholder="Descripción" required></textarea>
    </div>
    <div class="input-container">
      <input type="text" id="modalidad" placeholder="Modalidad (presencial/online)" required />
    </div>
    <div class="input-container">
      <input type="number" id="plazas" placeholder="Número de plazas" required />
    </div>
    <div class="input-container">
      <input type="text" id="duracion" placeholder="Duración (ej: 2h)" required />
    </div>
    <div class="input-container">
      <input type="number" id="price" placeholder="Precio (€)" required />
    </div>
    <button type="submit">Crear Taller</button>
    <div class="error-msg"></div>
  `
  const closeButton = document.createElement('button')
  closeButton.className = 'close-button'
  closeButton.innerHTML = '&times;'
  closeButton.title = 'Cerrar formulario'

  const token = localStorage.getItem('token')

  if (!token) {
    console.error(
      'Token no encontrado. Asegúrate de que el usuario esté autenticado.'
    )
    return
  }
  closeButton.addEventListener('click', (e) => {
    e.preventDefault()
    formContainer.remove()
  })
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    e.preventDefault()

    const titulo = document.getElementById('titulo').value
    const descripcion = document.getElementById('descripcion').value
    const modalidad = document.getElementById('modalidad').value
    const plazas = document.getElementById('plazas').value
    const duracion = document.getElementById('duracion').value
    const price = document.getElementById('price').value
    const img = document.getElementById('img').files[0]

    const formData = new FormData()
    formData.append('titulo', titulo)
    formData.append('descripcion', descripcion)
    formData.append('modalidad', modalidad)
    formData.append('plazas', plazas)
    formData.append('duracion', duracion)
    formData.append('price', price)

    if (img) {
      formData.append('img', img)
    }

    try {
      const response = await apiFetch('/talleres/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response) {
        alert('¡Taller creado con éxito!')
        form.reset()
      } else {
        console.error('El backend no devolvió datos.')
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message)
    }
  })
  form.appendChild(closeButton)
  formContainer.appendChild(form)
  return formContainer
}
