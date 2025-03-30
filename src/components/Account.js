import React, { useState } from 'react'; //useState zarządza komponentem
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles.css";
import { Link } from 'react-router-dom';

function Account() {
  // zapis formularza w komponencie
  const [formData, setFormData] = useState({ // formData - zapisuje dane, setFormData - aktualizuje formData, useState - zapisuje początkowe wartości
    email: "",
    password: "",
    role: "client",
    loading: false //ustawienie wartości początkowej dla paska ładowania
  });

  // Obsługa zmiany wartości w formularzu:
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    })); 
  };

  // Obsługa wysyłania formularza: 
  const handleSubmit = (event) => { 
    event.preventDefault(); //zapobiega przeładowaniu strony po wysłaniu formularza
    setFormData(prevState => ({
      ...prevState,
      loading: true,
    })); // pokazanie paska ładowania

    // Symulacja opóźnienia 
    setTimeout(() => {
      console.log(formData);
      
      // Po zakończeniu procesu ładowania, pokaż alert i zakończ ładowanie
      setFormData(prevState => ({
        ...prevState,
        loading: false,
      }));

      // Wyświetlenie alertu po zakończeniu rejestracji
      alert("Rejestracja zakończona pomyślnie!");
    }, 2000);
  };
  return (
    <>
      <Navbar />
      <div className="account">
        <h1>Rejestracja</h1>
        <form onSubmit={handleSubmit}>
          <p>E-mail</p>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <p>Hasło</p>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          
          <p>Typ konta</p>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
          >
            <option value="client">Klient</option>
            <option value="employee">Pracownik</option>
          </select>
          
          <br /><br />
          <input 
            type="submit" 
            value="Submit" 
            disabled={formData.loading} 
          />
          
          {formData.loading && (
            <div style={{ marginTop: 5, fontWeight: "bold" }}>Ładowanie...</div>
          )}
        </form>
        <Link to="/">Wróć na stronę główną</Link>
      </div>
      <Footer />
    </>
  );
};

export default Account;
