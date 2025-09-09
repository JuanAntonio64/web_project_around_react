import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";

// 👇 Importamos la API y el contexto
import { api } from "./utils/api.js";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // 👇 Traemos info del usuario al montar la app
  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
      });
  }, []);

  return (
    <div className="page">
      {/* 👇 Proveemos el usuario actual a toda la app */}
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
