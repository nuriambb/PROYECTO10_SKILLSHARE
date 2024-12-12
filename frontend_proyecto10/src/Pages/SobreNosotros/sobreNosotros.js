import './_sobreNosotros.scss'
export const sobreNosotros = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  const sectionSobreNosotros = document.createElement('section')
  sectionSobreNosotros.className = 'section-sobre-nosotros'
  sectionSobreNosotros.innerHTML = `  <div id="div-fondo">
      <img src="./assets/curva2.svg" />
    </div>
    <div id="div-contenedor-nosotros">
      <h2>Sobre Nosotros</h2>
      <div id="contenedor-general-info">
        <div id="contenedor-info1">
          <div id="div-texto">
            <h3>Compromiso con el aprendizaje</h3>
            <p>
             En Skillshare, creemos que todos tienen algo valioso que enseñar y mucho que aprender. Queremos romper las barreras de acceso al conocimiento, permitiendo que cualquier persona pueda explorar nuevas áreas de interés o profundizar en su especialidad, compartiendo conocimientos en una comunidad que valora el crecimiento personal y profesional.
            </p>
          </div>
          <div id="div-icono">
            <img id="icono" src="./assets/iconollave.svg" alt="icono llave" />
          </div>
        </div>
             <div id="contenedor-info1">
              
          <div id="div-texto">
            <h3>Nuestra Comunidad</h3>
            <p>
            Nuestra comunidad está formada por personas curiosas y apasionadas que buscan aprender de los demás y compartir su experiencia con generosidad. Aquí, los instructores no son solo maestros, sino también compañeros en el viaje de aprendizaje. Creemos en la colaboración como la clave para el desarrollo, y cada miembro aporta algo único y valioso.
            </p>
          </div>
         <div id="div-icono">
            <img id="icono" src="./assets/iconocompartir.svg" alt="icono llave" />
          </div>
        </div>
             <div id="contenedor-info1">
          <div id="div-texto">
            <h3>Impacto y Futuro</h3>
            <p>
             Con cada taller y cada participante, seguimos ampliando el acceso al aprendizaje en todos los rincones del mundo. Creemos que el futuro de la educación es colaborativo, y en Skillshare estamos comprometidos a liderar este cambio, impulsando el aprendizaje continuo y compartido. ¿Te unes a esta aventura?.
            </p>
          </div>
          <div id="div-icono">
            <img id="icono" src="./assets/iconofuturo.svg" alt="icono llave" />
          </div>
        </div>
                
      </div>
    </div>`
  main.append(sectionSobreNosotros)
}
