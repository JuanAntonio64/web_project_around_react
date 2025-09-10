import { useState, useEffect, useContext } from "react";
import Edit from "../../images/Edit_Icon.svg";
import Add from "../../images/Add_Icon.svg";

import EditProfileForm from "./EditProfile/EditProfileForm.jsx";
import EditAvatarForm from "./EditAvatar/EditAvatarForm.jsx";
import NewCardForm from "./NewCard/NewCardForm.jsx";
import Card from "./Card/Card.jsx";
import { api } from "../../utils/api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main({ onOpenPopup, setSelectedCard }) {
  const [cards, setCards] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  const editProfilePopup = { children: <EditProfileForm /> };
  const editAvatarPopup = { children: <EditAvatarForm /> };
  const newCardPopup = { children: <NewCardForm /> };

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
    api.getInitialCards()
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
            onClick={() => onOpenPopup(editAvatarPopup)}
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
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img src={Edit} alt="edit" className="popup__image-edit" />
          </button>
        </div>

        <button
          type="button"
          className="main__button main__button_add"
          onClick={() => onOpenPopup(newCardPopup)}
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
    </main>
  );
}

export default Main;
