
export function crearBotones(texto1, texto2) {
  const divButtons = document.createElement('div')
  divButtons.className = 'div-buttons'

  const button1 = document.createElement('button')
  button1.className = 'button1'
  button1.textContent = texto1
  button1.setAttribute('data-role', 'button1')

  const button2 = document.createElement('button')
  button2.className = 'button2'
  button2.textContent = texto2
  button2.setAttribute('data-role', 'button2')

  divButtons.append(button1, button2)

  
  return { divButtons, button1, button2 }
}
