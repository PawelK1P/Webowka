import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // obsługa przejść między stronami
import "./styles.css";
// importy elementów strony
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Categories from "./components/Categories";
import Registration from "./components/Registration";
import ProductPage from "./components/ProductPage";
import Login from "./components/Login";
import SingleProductPage from './components/SingleProductPage';

function App() {
  const location = useLocation(); // Służy do uzyskania aktualnej lokalizacji
  return (
    <div className="app">
      {location.pathname !== "/Registration" && location.pathname!=="/Login" && <Navbar />} {/* Renderuje Navbar tylko jeśli nie znajdujesz się na stronie Registration */}
      <main>
        <Routes>
          <Route path="/Registration" element={<Registration />} /> {/*obsługa przejścia do Registration*/}
          <Route path="/" element={<Main />} /> {/* Główna strona */}
          <Route path="/Login" element={<Login />} /> {/* Login */}
          {/* Można dodać inne przejścia tutaj */}
          <Route path="/ProductPage" element={<ProductPage />} />
            <Route path="/SingleProductPage" element={<SingleProductPage/>} />
        </Routes>
        {location.pathname !== "/Registration" && location.pathname !== "/ProductPage" && location.pathname !== "/SingleProductPage" && <Categories />} {/* Renderuj Categories tylko jeśli nie znajdujesz się na stronie Registration */}
      </main>
      {location.pathname !== "/Registration" && location.pathname !== "/ProductPage" &&  <Footer />} {/* Renderuj Footer tylko jeśli nie znajdujesz się na stronie Registration */}
    </div>
  );
}

export default App
// w index.js znajduje się obsługa uselocation(), które może działać tylko wewnątrz Router
