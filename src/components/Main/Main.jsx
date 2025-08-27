import { useState } from "react";
import Profile from "../../images/Profile_Icon.svg";
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

const initialCards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

function Main() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState(initialCards);
  const [selectedCard, setSelectedCard] = useState(null); 

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

  const handleLike = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card._id === id ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  };

  const handleDelete = (id) => {
    setCards((prev) => prev.filter((card) => card._id !== id));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card); 
  };

  return (
    <main className="main">
      <section className="main__profile">
        <div className="main__content-image">
          <button
            type="button"
            className="main__button main__button_editProfile"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img src={Profile} alt="profile" className="main__profile-image" />
          </button>
        </div>

        <div className="main__content-paragraph">
          <p className="main__paragraph main__paragraph_name">
            Juan Antonio Morales Balderas
          </p>
          <p className="main__paragraph main__paragraph_job">Programador</p>
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
              onLike={handleLike}
              onDelete={handleDelete}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>

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
              {popup.children}
            </NewCard>
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
