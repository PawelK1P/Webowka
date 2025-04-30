import React, { useState } from 'react'; //useState zarządza komponentem
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles.css";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import "../firebase.js";
import { app } from '../firebase';
import { useNavigate } from "react-router";

function Registration() {
  // zapis formularza w komponencie
  const [formData, setFormData] = useState({ // formData - zapisuje dane, setFormData - aktualizuje formData, useState - zapisuje początkowe wartości
    email: "",
    password: "",
    role: "",
    error: ""
  });

  // autoryzacja domeny
  const auth = getAuth(app);
  const navigate = useNavigate(); // służy do nawigacji po rejestracji

  // Obsługa zmiany wartości w formularzu:
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      error: ""
    })); 
  };

  // Obsługa wysyłania formularza: 
  const handleSubmit = async (event) => { 
    event.preventDefault(); //zapobiega przeładowaniu strony po wysłaniu formularza
    setFormData(prevState => ({
      ...prevState,
    }));

    // próba stworzenia konta i dodania jej do firebase
    try
    {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Rejestracja zakończona pomyślnie!");
        navigate("/"); // przekierowanie na stronę główną
    }
    catch (error) {
      console.log(error); // Logowanie błędu w konsoli
      let errorMessage = 'Wystąpił błąd. Spróbuj ponownie później.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Konto z takim adresem email już istnieje.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Nieprawidłowy adres email.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Nieprawidłowe dane logowania. Sprawdź swoje dane.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Hasło jest za słabe. Zmień na inne.';
          break;
        default:
          break;
      }
      setFormData(prevState => ({
        ...prevState,
        error: errorMessage
      }));
    }
  };
  return (
    <>
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
          />
        </form>
        {formData.error && <p className="error-message">{formData.error}</p>}
        </div>

        <p>Masz konto? Zaloguj się</p><div className='login'><Link to="/Login">Zaloguj się</Link></div>
      </div>
    </>
  );
};

export default Registration;
