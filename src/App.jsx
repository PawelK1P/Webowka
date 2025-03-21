import "./styles.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Categories from "./components/Categories"

function App() {
  return (
    <div className="app">
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

