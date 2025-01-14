import './_spinner.scss'
export const Spinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'spinner'
  spinner.innerHTML = '<div class="loading"></div>'
  return spinner
}
document.body.appendChild(Spinner())
