export const desplegarItemUrl = () => {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1])
  const selectedId = urlParams.get('id')
  console.log(selectedId)
  if (selectedId) {
    setTimeout(() => {
      const selectedButton = document.querySelector(
        `.button1a[data-id="${selectedId}"]`
      )

      console.log(selectedButton)

      if (selectedButton) {
        selectedButton.click()

        setTimeout(() => {
          const expandedTaller = document.querySelector('.div-taller.expanded')

          if (expandedTaller) {
            expandedTaller.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })
          }
        }, 100)
      } else {
        console.log('No se encontró el botón con el ID', selectedId)
      }
    }, 100)
  }
}