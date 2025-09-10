import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import EditProfile from "./components/Main/EditProfile/EditProfile.jsx";
import EditProfileForm from "./components/Main/EditProfile/EditProfileForm.jsx";
import EditAvatar from "./components/Main/EditAvatar/EditAvatar.jsx";
import EditAvatarForm from "./components/Main/EditAvatar/EditAvatarForm.jsx";
import NewCard from "./components/Main/NewCard/NewCard.jsx";
import NewCardForm from "./components/Main/NewCard/NewCardForm.jsx";
import ImagePopup from "./components/Main/ImagePopup/ImagePopup.jsx";

import { api } from "./utils/api.js";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // 👉 Obtener info usuario al montar
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error("Error al obtener usuario:", err));
  }, []);

  // 👉 Abrir popup
  function handleOpenPopup(popupObj) {
    setPopup(popupObj);
  }

  // 👉 Cerrar popup
  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  // 👉 Actualizar perfil
  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup(); // ✅ cierra después de guardar
      })
      .catch((err) => console.error("Error al actualizar usuario:", err));
  }

  // 👉 Actualizar avatar
  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup(); // ✅ cierra después de guardar
      })
      .catch((err) => console.error("Error al actualizar avatar:", err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          setSelectedCard={setSelectedCard}
        />
        <Footer />

        {/* Popups controlados desde App */}
        {popup && (
          <>
            {popup.children.type === EditAvatarForm && (
              <EditAvatar onClose={handleClosePopup}>{popup.children}</EditAvatar>
            )}
            {popup.children.type === EditProfileForm && (
              <EditProfile onClose={handleClosePopup}>
                {popup.children}
              </EditProfile>
            )}
            {popup.children.type === NewCardForm && (
              <NewCard onClose={handleClosePopup}>{popup.children}</NewCard>
            )}
          </>
        )}

        {selectedCard && (
          <ImagePopup card={selectedCard} onClose={handleClosePopup} />
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
