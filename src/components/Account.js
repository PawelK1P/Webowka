import React, { useEffect, useState } from 'react';
import userIcon from '../assets/user.png'; // Renamed to avoid conflict with state variable
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles.css";
import { app } from "../firebase"; 
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Account() {
  const [currentUser , setCurrentUser ] = useState(null); // Renamed to avoid conflict
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser (user);
      setChecking(false);
      if (!user) {
        navigate("/registration", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (checking) return <div>Ładowanie danych konta...</div>;

  return (
    <>
      <Navbar />
      <div className="registration">
        <div className="registration-form">
          <>
            <h1>Szczegóły konta</h1>
            <img src={userIcon} alt="icon"/>
            {currentUser  ? ( // Check if currentUser  is not null
              <>
                <p>Email: {currentUser .email}</p>
                <p>Status konta: {currentUser .role}</p>
              </>
            ) : (
              <p>Brak danych użytkownika.</p> // Fallback message if user is null
            )}
            <hr />
            <h1>Modyfikacja konta</h1>
            <button onClick={() => signOut(auth)} className="prod">Wyloguj się</button>
          </>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Account;