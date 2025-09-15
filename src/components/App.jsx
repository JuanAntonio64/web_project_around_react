import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Popup from "./Main/components/Popup/Popup.jsx";
import EditProfile from "./Main/components/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "./Main/components/Popup/EditAvatar/EditAvatar.jsx";
import NewCard from "./Main/components/Popup/NewCard/NewCard.jsx";
import ImagePopup from "./Main/components/Popup/ImagePopup/ImagePopup.jsx";

import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState(null); 
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api.getUserInfo()
      .then(setCurrentUser)
      .catch((err) => console.error("Error al obtener usuario:", err));

    api.getInitialCards()
      .then(setCards)
      .catch((err) => console.error("Error al obtener tarjetas:", err));
  }, []);

  function handleOpenPopup(popupName) {
    setSelectedPopup(popupName); 
  }

  function handleClosePopup() {
    setSelectedPopup(null);
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
      setCards([newCard, ...cards]); 
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
          selectedPopup={selectedPopup} 
          onClosePopup={handleClosePopup}
          setSelectedCard={setSelectedCard}
        />
        <Footer />

        <Popup isOpen={selectedPopup === "editAvatar"} onClose={handleClosePopup}>
          <EditAvatar />
        </Popup>

        <Popup isOpen={selectedPopup === "editProfile"} onClose={handleClosePopup}>
          <EditProfile />
        </Popup>

        <Popup isOpen={selectedPopup === "newCard"} onClose={handleClosePopup}>
          <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} />
        </Popup>

        {selectedCard && (
          <Popup isOpen={true} onClose={handleClosePopup}>
            <ImagePopup card={selectedCard} />
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
