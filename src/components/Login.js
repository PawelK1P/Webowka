import React, { useState } from 'react'; //useState zarządza komponentem
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles.css";
import { Link } from 'react-router-dom';

function Login() {
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
      alert("Logowanie zakończone pomyślnie!");
    }, 2000);
  };
  return (
    <>
      <Navbar />
      <div className="registration">
      <div className="registration-form">
        <h1>Logowanie</h1>
        <form onSubmit={handleSubmit}>
          <p>E-mail</p>
          <input 
            type="email" className='text'
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder='E-mail' 
          />
          <p>Hasło</p>
          <input 
            type="password" className='text'
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required
            placeholder='Hasło' 
          />          
          <br /><br />
          <input 
            type="submit" 
            value="Zaloguj się" 
            disabled={formData.loading}
          />
          
          {formData.loading && (
            <div style={{ marginTop: 5, fontWeight: "bold" }}>Ładowanie...</div>
          )}
        </form>
        </div>

        <p>Nie masz konta? Utwórz je</p><div className='login'><Link to="/Registration">Rejestracja</Link></div>
      </div>
      <Footer />
    </>
  );
};

export default Login;