export function gestionarReservas({
  botones,
  itemIdKey,
  reservedKey,
  endpoint,
  successMessage,
  parentElement
}) {
  let reservedItems = JSON.parse(localStorage.getItem(reservedKey)) || []

  botones.forEach((button) => {
    const itemId = button.dataset[itemIdKey] 
    if (reservedItems.includes(itemId)) {
      button.textContent = '¡Ya estás apuntado!'
      button.disabled = true
    }

    button.addEventListener('click', async () => {
      console.log('id', itemId)

      const token = localStorage.getItem('token')

      if (!token) {
        alert('No estás autorizado')
        return
      }

      try {
        const data = await apiFetch(`/${endpoint}/apuntarse/`, {
          method: 'POST',
          body: { id: itemId }
        })
        console.log(data)

        if (data && data.message === successMessage) {
          button.textContent = '¡Ya estás apuntado!'
          button.disabled = true

          if (!reservedItems.includes(itemId)) {
            reservedItems.push(itemId)
            localStorage.setItem(reservedKey, JSON.stringify(reservedItems))
          }
        } else {
          alert(data.error || `Error al intentar apuntarse al ${endpoint}`)
        }
      } catch (error) {
        console.error('Error al intentar reservar:', error.message)
      }
    })
  })

  parentElement.append(...botones)
}
