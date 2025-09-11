import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditProfileForm from "./components/EditProfile/EditProfileForm.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";
import EditAvatarForm from "./components/EditAvatar/EditAvatarForm.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import NewCardForm from "./components/NewCard/NewCardForm.jsx";
import ImagePopup from "./components/ImagePopup/ImagePopup.jsx";

import { api } from "./utils/api.js";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api.getUserInfo()
      .then(setCurrentUser)
      .catch((err) => console.error("Error al obtener usuario:", err));

    api.getInitialCards()
      .then(setCards)
      .catch((err) => console.error("Error al obtener tarjetas:", err));
  }, []);

  function handleOpenPopup(popupObj) {
    setPopup(popupObj);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch((err) => console.error("Error al actualizar usuario:", err));
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch((err) => console.error("Error al actualizar avatar:", err));
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (err) {
      console.error("Error al dar like/dislike:", err);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (err) {
      console.error("Error al eliminar tarjeta:", err);
    }
  }

  async function handleAddPlaceSubmit({ name, link }) {
    try {
      const newCard = await api.createCard(name, link);
      setCards([newCard, ...cards]); // inserta al inicio
      handleClosePopup();
    } catch (err) {
      console.error("Error al agregar tarjeta:", err);
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onOpenPopup={handleOpenPopup}
          setSelectedCard={setSelectedCard}
        />
        <Footer />

        {/* Popups */}
        {popup && (
          <>
            {popup.children.type === EditAvatarForm && (
              <EditAvatar onClose={handleClosePopup}>
                {popup.children}
              </EditAvatar>
            )}
            {popup.children.type === EditProfileForm && (
              <EditProfile onClose={handleClosePopup}>
                {popup.children}
              </EditProfile>
            )}
            {popup.children.type === NewCardForm && (
              <NewCard onClose={handleClosePopup}>
                <NewCardForm onAddPlaceSubmit={handleAddPlaceSubmit} />
              </NewCard>
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
