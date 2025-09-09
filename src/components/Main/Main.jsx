import { useState, useEffect, useContext } from "react";
import Edit from "../../images/Edit_Icon.svg";
import Add from "../../images/Add_Icon.svg";

import EditProfile from "./EditProfile/EditProfile.jsx";
import EditProfileForm from "./EditProfile/EditProfileForm.jsx";
import EditAvatar from "./EditAvatar/EditAvatar.jsx";
import EditAvatarForm from "./EditAvatar/EditAvatarForm.jsx";
import NewCard from "./NewCard/NewCard.jsx";
import NewCardForm from "./NewCard/NewCardForm.jsx";
import Card from "./Card/Card.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { api } from "../../utils/api.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const currentUser = useContext(CurrentUserContext);

  const editProfilePopup = { children: <EditProfileForm /> };
  const editAvatarPopup = { children: <EditAvatarForm /> };
  const newCardPopup = { children: <NewCardForm /> };

  function handleOpenPopup(popupObj) {
    setPopup(popupObj);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  // ✅ Like / Dislike
  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    } catch (error) {
      console.error("Error al dar like/dislike:", error);
    }
  }

  // ✅ Eliminar tarjeta
  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Error al eliminar tarjeta:", error);
    }
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error("Error al obtener tarjetas:", err);
      });
  }, []);

  return (
    <main className="main">
      <section className="main__profile">
        <div className="main__content-image">
          <button
            type="button"
            className="main__button main__button_editProfile"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="main__profile-image"
            />
          </button>
        </div>

        <div className="main__content-paragraph">
          <p className="main__paragraph main__paragraph_name">
            {currentUser?.name}
          </p>
          <p className="main__paragraph main__paragraph_job">
            {currentUser?.about}
          </p>
          <button
            type="button"
            className="main__button main__button_edit"
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            <img src={Edit} alt="edit" className="popup__image-edit" />
          </button>
        </div>

        <button
          type="button"
          className="main__button main__button_add"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img src={Add} alt="add" className="popup__image-add" />
        </button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <>
          {popup.children.type === EditAvatarForm && (
            <EditAvatar onClose={handleClosePopup}>{popup.children}</EditAvatar>
          )}

          {popup.children.type === EditProfileForm && (
            <EditProfile onClose={handleClosePopup}>{popup.children}</EditProfile>
          )}

          {popup.children.type === NewCardForm && (
            <NewCard onClose={handleClosePopup}>{popup.children}</NewCard>
          )}
        </>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={handleClosePopup} />
      )}
    </main>
  );
}

export default Main;
