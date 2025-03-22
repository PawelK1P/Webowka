import fishpic from '../assets/placeholder.png';
{/*sekcja z placeholderem i guzikiem */}
function Main() {
  return (
    <section className="main">
      <img src={fishpic} alt="Fish background" className="main-img" />
      <div className="main-content">
        <h1>Świat Wędkarza</h1>
        <p>Z nami złowisz dużą rybę</p>
        <a href="#" className="prod">
          Zobacz produkty
        </a>
      </div>
    </section>
  )
}

export default Main

