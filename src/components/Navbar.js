import icon from '../assets/ikona.png';
function Navbar() {
  return (
    <header>
      <div className="top-bar">
        <div className="logo">
          <span><img src={icon} alt="Fish icon"/></span>
          <div>
            <h1>Świat Wędkarza</h1>
            <p>Z nami złowisz dużą rybę</p>
          </div>
        </div>

        <div className="search">
          <input type="text" placeholder="Wpisz czego szukasz" />
          <button>Szukaj</button>
        </div>

        <nav className="user-nav">
          <a href="#">Pomoc</a>
          <a href="#">Kontakt </a>
          <a href="#">Koszyk </a>
          <a href="#">Konto</a>
        </nav>
      </div>

      <nav className="categories-nav">
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <a href="#">{category.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

const categories = [
  { name: "Odzież"},
  { name: "Kołowrotki"},
  { name: "Przynęty"},
  { name: "Wędki"},
  { name: "Żyłki"},
  { name: "Haczyki"},
]

export default Navbar

