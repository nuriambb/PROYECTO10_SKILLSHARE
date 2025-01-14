import { crearBotones } from '../Buttons/buttons'
import { apiFetch } from '../../Utils/apiFetch'

export const pintarContenido = async (
  contenido,
  tipo,
  elementoPadre,
  esTallerUsuario = false
) => {
  for (const item of contenido) {
    const endpoint = tipo === 'taller' ? 'talleres' : 'eventos'

    const divItem = document.createElement('div')
    divItem.className = `div-taller`

    const divInfo1 = document.createElement('div')
    divInfo1.className = 'div-info1'

    const divImg = document.createElement('div')
    divImg.className = 'div-img'
    const imgItem = document.createElement('img')
    imgItem.src = item.img
    divImg.append(imgItem)

    const divTexto1 = document.createElement('div')
    divTexto1.className = 'div-texto1'
    const h3Texto1 = document.createElement('h3')
    h3Texto1.textContent = item.titulo

    const pDescripcionReducida = document.createElement('p')
    pDescripcionReducida.className = 'p-reducido'
    pDescripcionReducida.textContent = item.descripcion.slice(0, 250) + '...'

    let divButtons1, button1a, button2a

    if (!esTallerUsuario) {
      ;({
        divButtons: divButtons1,
        button1: button1a,
        button2: button2a
      } = crearBotones('< Saber Más', 'Apuntarme >'))

      button1a.className = 'button1a'
      button1a.dataset.id = item._id
      button2a.className = 'button2'
      button2a.dataset.id = item._id

      divTexto1.append(h3Texto1, pDescripcionReducida)
      divInfo1.append(divTexto1, divButtons1)
    } else {
      divButtons1 = document.createElement('div')
      divButtons1.className = 'div-buttons'

      const buttonEliminar = document.createElement('button')
      buttonEliminar.textContent = 'Eliminar Taller'
      buttonEliminar.className = 'button-eliminar'

      buttonEliminar.addEventListener('click', async () => {
        const token = localStorage.getItem('token')
        if (!token) {
          alert('No estás autorizado')
          return
        }

        const isConfirmed = window.confirm(
          '¿Estás seguro que quieres eliminar el taller?'
        )
        if (isConfirmed) {
          try {
            const response = await apiFetch(`/talleres/${item._id}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

            if (response && response.message === 'Elemento eliminado') {
              alert('Taller eliminado con éxito')
              divItem.remove()
            } else {
              alert(response.error || 'Error al eliminar el taller')
            }
          } catch (error) {
            console.error('Error al intentar eliminar:', error.message)
          }
        } else {
          console.log('Eliminación del taller cancelada.')
        }
      })

      divButtons1.append(buttonEliminar)
      divTexto1.append(h3Texto1, pDescripcionReducida)
      divInfo1.append(divTexto1, divButtons1)
    }

    divItem.append(divImg, divInfo1)

    const divInfoCompleta = document.createElement('div')
    divInfoCompleta.className = 'div-info-completa'
    divInfoCompleta.style.display = 'none'

    const pDescripcionCompleta = document.createElement('p')
    pDescripcionCompleta.textContent = item.descripcion

    let h5ExtraInfo
    if (tipo === 'taller') {
      h5ExtraInfo = document.createElement('h5')
      h5ExtraInfo.textContent = `Impartido por ${item.user.name}`
    } else if (tipo === 'evento') {
      h5ExtraInfo = document.createElement('h5')
      h5ExtraInfo.textContent = `Fecha: ${item.fecha}`
    }

    const h4Modalidad = document.createElement('h4')
    h4Modalidad.textContent = `Modalidad: ${item.modalidad}`
    const h4Plazas = document.createElement('h4')
    h4Plazas.textContent = `Plazas: ${item.plazas}`
    const h4Duracion = document.createElement('h4')
    h4Duracion.textContent = `Duración: ${item.duracion}`
    const h4Precio = document.createElement('h4')
    h4Precio.textContent = `Precio: ${item.price}€`

    let {
      divButtons: divButtons2,
      button1: button1b,
      button2: button2b
    } = crearBotones('< Mostrar menos', 'Apuntarme >')
    button2b.className = 'button2'
    button2b.dataset.id = item._id

    const divCaracteristicas = document.createElement('div')
    divCaracteristicas.className = 'div-caract'
    divCaracteristicas.append(h4Modalidad, h4Plazas, h4Duracion, h4Precio)

    divInfoCompleta.append(
      pDescripcionCompleta,
      h5ExtraInfo,
      divCaracteristicas,
      divButtons2
    )
    divTexto1.append(divInfoCompleta)

    const buttonSaberMas = button1a
    buttonSaberMas?.addEventListener('click', () => {
      window.history.pushState({}, 'Talleres', `#talleres?id=${item._id}`)
      pDescripcionReducida.style.display = 'none'
      divButtons1.style.display = 'none'
      divInfoCompleta.style.display = 'flex'
      divInfoCompleta.classList.add('mostrar')
      divItem.classList.add('expanded')

      divImg.classList.add('expanded')
    })

    const buttonMostrarMenos = button1b
    buttonMostrarMenos.addEventListener('click', () => {
      pDescripcionReducida.style.display = 'flex'
      divButtons1.style.display = 'flex'
      divInfoCompleta.style.display = 'none'
      divInfoCompleta.classList.remove('mostrar')
      divItem.classList.remove('expanded')
      divImg.classList.remove('expanded')
    })

    const buttonsApuntarme = divItem.querySelectorAll('.button2')

    let reservedItems = await getReservedItems(tipo)

    buttonsApuntarme.forEach((button) => {
      const itemId = item._id
      console.log(itemId)

      if (reservedItems.includes(itemId)) {
        button.textContent = '¡Ya estás apuntado!'
        button.disabled = true
      }

      button.addEventListener('click', async () => {
        const token = localStorage.getItem('token')
        if (!token) {
          alert('No estás autorizado. Por favor, inicia sesión para continuar.')
          return
        }

        try {
          const data = await apiFetch(`/${endpoint}/apuntarse/`, {
            method: 'POST',
            body: JSON.stringify({ id: itemId })
          })

          if (data && data.message === 'Reservado con éxito') {
            button.textContent = '¡Ya estás apuntado!'
            button.disabled = true

            console.log('Estado antes de añadir:', { itemId, reservedItems })

            if (!reservedItems.includes(itemId)) {
              reservedItems.push(itemId)
              console.log('IDs reservados después:', reservedItems)
            }
          } else {
            alert(data.error || `Error al intentar apuntarse al ${tipo}`)
          }
        } catch (error) {
          console.error('Error al intentar reservar:', error.message)
          alert('Error de conexión. Por favor, intenta de nuevo más tarde.')
        }
      })
    })

    if (elementoPadre) {
      elementoPadre.append(divItem)
    }
  }
}
const getReservedItems = async (tipo) => {
  try {
    const reservedKey =
      tipo === 'taller' ? 'talleresReservados' : 'eventosReservados'

    const user = await apiFetch('/users/perfil', { method: 'GET' })

    const reservedItems = (user[reservedKey] || []).map((item) => item._id)

    console.log(`IDs reservados (${reservedKey}):`, reservedItems)
    return reservedItems
  } catch (error) {
    console.error('Error al obtener los elementos reservados:', error)
    return []
  }
}
