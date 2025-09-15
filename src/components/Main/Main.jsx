import { useContext } from "react";
import Edit from "../../images/Edit_Icon.svg";
import Add from "../../images/Add_Icon.svg";

import EditProfile from "./components/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar.jsx";
import NewCard from "./components/Popup/NewCard/NewCard.jsx";
import Card from "./components/Card/Card.jsx";
import Popup from "./components/Popup/Popup.jsx"; 
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  selectedPopup,
  onClosePopup,
  setSelectedCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);

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
            onClick={() => onOpenPopup("editAvatar")}
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
            onClick={() => onOpenPopup("editProfile")}
          >
            <img src={Edit} alt="edit" className="popup__image-edit" />
          </button>
        </div>

        <button
          type="button"
          className="main__button main__button_add"
          onClick={() => onOpenPopup("newCard")}
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
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>

      <Popup isOpen={selectedPopup === "EditProfile"} onClose={onClosePopup}>
        <EditProfile />
      </Popup>

      <Popup isOpen={selectedPopup === "EditAvatar"} onClose={onClosePopup}>
        <EditAvatar />
      </Popup>

      <Popup isOpen={selectedPopup === "NewCard"} onClose={onClosePopup}>
        <NewCard />
      </Popup>
    </main>
  );
}

export default Main;
