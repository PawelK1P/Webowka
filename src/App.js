import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // obsługa przejść między stronami
import "./styles.css";
// importy elementów strony
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Categories from "./components/Categories";
import Account from "./components/Account";
import ProductPage from "./components/ProductPage";

function App() {
  const location = useLocation(); // Służy do uzyskania aktualnej lokalizacji
  return (
    <div className="app">
      {location.pathname !== "/account" && <Navbar />} {/* Renderuje Navbar tylko jeśli nie znajdujesz się na stronie Account */}
      <main>
        <Routes>
          <Route path="/account" element={<Account />} /> {/*obsługa przejścia do Account*/}
          <Route path="/" element={<Main />} /> {/* Główna strona */}
          {/* Można dodać inne przejścia tutaj */}
          <Route path="/ProductPage" element={<ProductPage />} />
        </Routes>
        {location.pathname !== "/account" && location.pathname !== "/ProductPage" && <Categories />} {/* Renderuj Categories tylko jeśli nie znajdujesz się na stronie Account */}
      </main>
      {location.pathname !== "/account" && location.pathname !== "/ProductPage" &&  <Footer />} {/* Renderuj Footer tylko jeśli nie znajdujesz się na stronie Account */}
    </div>
  );
}

export default App
// w index.js znajduje się obsługa uselocation(), które może działać tylko wewnątrz Router