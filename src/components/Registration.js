import React, { useState } from 'react'; //useState zarządza komponentem
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles.css";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import "../firebase.js";
import { app } from '../firebase';

function Registration() {
  // zapis formularza w komponencie
  const [formData, setFormData] = useState({ // formData - zapisuje dane, setFormData - aktualizuje formData, useState - zapisuje początkowe wartości
    email: "",
    password: "",
    role: "client",
    loading: false //ustawienie wartości początkowej dla paska ładowania
  });

  // autoryzacja domeny
  const auth = getAuth(app);

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

    // próba stworzenia konta i dodania jej do firebase
    try
    {
        createUserWithEmailAndPassword(auth, formData.email, formData.password);
    }
    catch(error)
    {
        console.log(error);
    }

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
      <div className="registration">
      <div className="registration-form">
        <h1>Rejestracja</h1>
        <form onSubmit={handleSubmit}>
          <p>E-mail</p>
          <input 
            type="email" className='text'
            name="email"
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder='E-mail' 
          />
          <p>Hasło</p>
          <input 
            type="password" className='text'
            name="password"
            id="password" 
            value={formData.password} 
            onChange={handleChange} 
            required
            placeholder='Hasło' 
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
            id="submit" 
            value="Zarejestruj się" 
            disabled={formData.loading}
          />
          
          {formData.loading && (
            <div style={{ marginTop: 5, fontWeight: "bold" }}>Ładowanie...</div>
          )}
        </form>
        </div>

        <p>Masz konto? Zaloguj się</p><div className='login'><Link to="/Login">Zaloguj się</Link></div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
