import { Navigate } from '../../Routes/navigate'
import { Talleres } from '../Talleres/talleres'
import { apiFetch } from '../../Utils/apiFetch'
import { Eventos } from '../Eventos/eventos'
import { crearFormularioTaller } from '../../Components/Formulario/formulario'
import { pintarContenido } from '../../Components/pintarContenido/pintarContenido'
import './_miEspacio.scss'

export const miEspacio = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const miEspacioSection = document.createElement('section')
  miEspacioSection.id = 'mi-espacio-section'
  miEspacioSection.innerHTML = `
    <div id="div-fondo">
      <img src="./assets/amarillouser.svg">
    </div>
    <div id="div-contenedor-user">
      <div id="div-info1">
        <h1 id="nombre-usuario"></h1>
        <div class="profile-container">
          <input type="file" id="profile-upload" accept="image/*" style="display: none;" />
          <label for="profile-upload" class="profile-label">
            <img src="default-profile.png" alt="" class="profile-image" id="profile-image" />
          </label>
        </div>
        <p id="email"></p>
        <div id="buttons-container">
   
      <button id="cerrar-sesion">Cerrar Sesión</button>
    </div>
      </div>
      <div id="perfil-info">
        <div id="div-talleres">
          <div id="div-t-reservados">
          
              <img id="icono" src="./assets/treservados.png"  />
            <h3 id="toggle-reservados">
              <i class="fas fa-calendar-check"></i> Talleres Reservados (<span id="reservados-count">0</span>)
            </h3>
            <ul id="talleres-reservados"></ul>
          </div>
          <div id="div-t-impartidos">
             <img id="icono" src="./assets/timpartidos.png"  />
            <h3 id="toggle-impartidos">
              <i class="fas fa-chalkboard-teacher"></i> Talleres Impartidos (<span id="impartidos-count">0</span>)
            </h3>
            <ul id="talleres-impartidos"></ul>
          </div>
        </div>
        <div id="div-eventos">
         <img id="icono" src="./assets/ereservados.png"  />
          <h3 id="toggle-eventos">
            <i class="fas fa-calendar"></i> Eventos Reservados (<span id="eventos-count">0</span>)
          </h3>
          <ul id="eventos-reservados"></ul>
        </div>
      </div>
    </div>
       <div id="contenedor-tus-talleres">
           <div class="div-titulo-talleres">
             <h2>Tus talleres</h2>
         <button id="crear-taller">Crear Taller</button>
           </div>
    
      <div id="div-tus-talleres">
        
      </div>
    </div>
`

  console.log('Cargando Mi Espacio...')

  getUserProfile()

  main.append(miEspacioSection)

  const profileUpload = document.getElementById('profile-upload')
  const profileImage = document.getElementById('profile-image')

  const savedProfileImage = localStorage.getItem('profileImage')
  if (savedProfileImage) {
    profileImage.src = savedProfileImage
  }

  if (profileUpload && profileImage) {
    profileUpload.addEventListener('change', (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          const imageSrc = e.target.result
          profileImage.src = imageSrc
          localStorage.setItem('profileImage', imageSrc)
        }

        reader.readAsDataURL(file)
      } else {
        console.log(
          'No se seleccionó ningún archivo o el archivo no es válido.'
        )
      }
    })
  } else {
    console.error('no se encuentra en el dom')
  }

  const toggleList = (id) => {
    const list = document.getElementById(id)
    const display = list.style.display === 'none' ? 'block' : 'none'
    list.style.display = display
  }

  document.getElementById('toggle-reservados').addEventListener('click', () => {
    toggleList('talleres-reservados')
  })

  document.getElementById('toggle-impartidos').addEventListener('click', () => {
    toggleList('talleres-impartidos')
  })

  document.getElementById('toggle-eventos').addEventListener('click', () => {
    toggleList('eventos-reservados')
  })

  const cerrarSesionButton = document.getElementById('cerrar-sesion')
  cerrarSesionButton.addEventListener('click', cerrarSesion)
  const crearTallerButton = document.getElementById('crear-taller')
  crearTallerButton.addEventListener('click', () => {
    const formulario = crearFormularioTaller()

    miEspacioSection.appendChild(formulario)
  })

  const divTusTalleres = document.getElementById('div-tus-talleres')

  async function cargarTalleres() {
    try {
      const talleres = await apiFetch('/talleres/user-talleres', {
        method: 'GET'
      })
      pintarContenido(talleres, 'taller', divTusTalleres, true)
    } catch (error) {
      console.error('Error al cargar los talleres:', error)
    }
  }
  console.log(divTusTalleres)

  cargarTalleres()
}

const getUserProfile = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    alert('No estás autenticado')
    return
  }

  try {
    const data = await apiFetch('/users/perfil')

    document.getElementById('nombre-usuario').textContent = data.name
    document.getElementById('email').textContent = data.email

    const populateList = (listId, items, navigateFn) => {
      const listElement = document.getElementById(listId)
      items.forEach((item) => {
        const li = document.createElement('li')
        li.dataset.id = item._id

        const titleDiv = document.createElement('div')
        titleDiv.className = 'title-div'
        titleDiv.textContent = `👉 ${item.titulo}`

        const unreserveButton = document.createElement('button')
        unreserveButton.textContent = 'Desapuntarse'
        unreserveButton.classList.add('unreserve-button')
        unreserveButton.addEventListener('click', async (event) => {
          event.stopPropagation()
          await desapuntarseTaller(item._id, listElement, li)
        })
        titleDiv.appendChild(unreserveButton)
        li.appendChild(titleDiv)
        li.addEventListener('click', () => {
          window.location.href = `#${navigateFn.name.toLowerCase()}?id=${
            item._id
          }`
          Navigate(navigateFn(item._id))
        })
        listElement.appendChild(li)
      })
    }

    populateList('talleres-reservados', data.talleresReservados, Talleres)
    populateList('talleres-impartidos', data.talleresImpartidos, Talleres)
    populateList('eventos-reservados', data.eventosReservados, Eventos)

    document.getElementById('reservados-count').textContent =
      data.talleresReservados.length
    document.getElementById('impartidos-count').textContent =
      data.talleresImpartidos.length
    document.getElementById('eventos-count').textContent =
      data.eventosReservados.length
  } catch (error) {
    console.error('Error al obtener el perfil:', error)
  }
}
function cerrarSesion() {
  localStorage.removeItem('token')
  document.cookie = 'token=; Max-Age=0; path=/;'
  Navigate('Prehome')
}

const desapuntarseTaller = async (idTaller, listElement, listItem) => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('No estás autenticado')
    return
  }

  try {
    const response = await apiFetch(
      '/talleres/desapuntarse/',
      {
        method: 'POST',
        body: JSON.stringify({ id: idTaller })
      },
      console.log('ID del taller:', idTaller)
    )

    console.log('Response de la API:', response)
    if (response && response.message === 'Desapuntado con éxito') {
      alert('Te has desapuntado del taller exitosamente')
      listElement.removeChild(listItem)
    } else {
      const errorData = await response.json()
      alert(`Error: ${errorData.error || 'No se pudo desapuntar del taller'}`)
      return
    }
  } catch {
    console.error('Error al desapuntarse del taller')
    alert('Ocurrió un error al intentar desapuntarse')
  }
}
