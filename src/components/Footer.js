function Footer() {
  {/*Sekcja footer*/}
  return (
    <footer>
      <div className="footer-content">
        <section className="footer-section">
          <h3>Świat Wędkarza</h3>
          <p>Najlepszy sklep wędkarski z szerokim asortymentem sprzętu dla początkujących i profesjonalistów.</p>
          <div className="social">
            <a href="#">Facebook </a>
            <a href="#">Instagram </a>
            <a href="#">YouTube </a>
          </div>
        </section>

        <section className="footer-section">
          <h3>Kategorie</h3>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <a href="#">{category}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="footer-section">
          <h3>Pomoc</h3>
          <ul>
            {helpLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="footer-section">
          <h3>Kontakt</h3>
          <p>Email: kontakt@swiatwedkarza.pl</p>
          <p>Telefon: +48 123 456 789</p>
        </section>
      </div>

      <div className="copyright">
        <p>{new Date().getFullYear()} Świat Wędkarza. Wszystkie prawa zastrzeżone.</p>
      </div>
    </footer>
  )
}

const categories=["Odzież","Kołowrotki","Przynęty","Wędki","Żyłki","Haczyki"]

const helpLinks=["Dostawa i płatność","Zwroty i reklamacje","Regulamin","Polityka prywatności","FAQ"]

export default Footer

