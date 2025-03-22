import "./styles.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Categories from "./components/Categories"
{/*Pobieranie plików z folderu Components*/}
function App() {
  return (
    <div className="app">
      {/* odwołanie do plików znajdujących się w Components (w plikach znajduje się konkretna część strony)*/}
      <Navbar />
      <main>
        <Main />
        <Categories />
      </main>
      <Footer />
    </div>
  )
}

export default App
