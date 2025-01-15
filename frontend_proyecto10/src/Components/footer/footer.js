import './_footer.scss'
export const Footer = () => {
  const footer = document.createElement('footer')

  footer.innerHTML = `
   
      <div class="footer-copyright">
        <p>&copy; ${new Date().getFullYear()} Página creada por Nuria Morcillo Bonillo</p>
      </div>
    </div>
  `

  document.body.appendChild(footer)
}
