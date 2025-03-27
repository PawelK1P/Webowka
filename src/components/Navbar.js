import icon from '../assets/ikona.png';
import { Link } from 'react-router-dom'; // import komponentu Link (służy do obsługi routingu, dzięki któremu można się przenosić między stronami)
function Navbar() {
  return (
    <header>
      {/*Pierwszy pasek*/}
      <div className="top-bar">
        {/*Logo sklepu*/}
        <div className="logo">
          <span><img src={icon} alt="Fish icon"/></span>
          <div>
            <h1>Świat Wędkarza</h1>
            <p>Z nami złowisz dużą rybę</p>
          </div>
        </div>
      {/*Wyszukiwarka*/}
        <div className="search">
          <input type="text" placeholder="Wpisz czego szukasz" />
          <button>Szukaj</button>
        </div>

      {/*Nawigacja podstron*/}
      <nav className="user-nav">
          <a href="#">Pomoc</a>
          <a href="#">Kontakt </a>
          <a href="#">Koszyk </a>
          <Link to="/account">Konto</Link> {/*Link to jest używane jako "załącznik", odsyła do Account.js*/}
        </nav>
      </div>
    {/*Nawigacja kategorii*/}
    <nav className="categories-nav">
        <ul>
          {/*lista kategorii*/}
          {categories.map((category) => ( 
            <li key={category.name}> {/*osobna kategoria*/}
              <a href="#">{category.name}</a> {/*załącznik kategorii*/}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
{/*Kategorie*/}
const categories = [
  { name: "Odzież"},
  { name: "Kołowrotki"},
  { name: "Przynęty"},
  { name: "Wędki"},
  { name: "Żyłki"},
  { name: "Haczyki"},
]

export default Navbar

