import fishpic from '../assets/placeholder.png';
import { Link } from 'react-router-dom';
import "../styles.css";
{/*sekcja z placeholderem i guzikiem */}
function Main() {
  return (
    <section className="main">
      <img src={fishpic} alt="Fish background" className="main-img" />
      <div className="main-content">
        <h1>Świat Wędkarza</h1>
        <p>Z nami złowisz dużą rybę</p>
        <Link to="/ProductPage" className="prod">
          Zobacz produkty
        </Link>
      </div>
    </section>
  )
}

export default Main

