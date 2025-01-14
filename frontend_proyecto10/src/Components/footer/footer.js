import './_footer.scss'
export const Footer = () => {
  const footer = document.createElement('footer')

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-links">
        <a href="#home">Inicio</a>
        <a href="#about">Sobre Nosotros</a>
        <a href="#contact">Contacto</a>
        <a href="#privacy">Privacidad</a>
      </div>
      <div class="footer-copyright">
        <p>&copy; ${new Date().getFullYear()} Página creada por Nuria Morcillo Bonillo.</p>
      </div>
    </div>
  `

  document.body.appendChild(footer)
}
