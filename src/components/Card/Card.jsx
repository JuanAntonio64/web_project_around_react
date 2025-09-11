import TrashIcon from "../../images/Trash.png";
import HeartIcon from "../../images/hearth.svg";
import HeartIconActive from "../../images/hearth_click.svg";

function Card({ card, onCardDelete, onCardLike, onCardClick }) {
  const { name, link, isLiked } = card;

  // Clase del botón según isLiked
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  // Icono según estado
  const heartSrc = isLiked ? HeartIconActive : HeartIcon;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />

      <button
        className="card__trash-button"
        onClick={handleDeleteClick}
        type="button"
      >
        <img src={TrashIcon} alt="trash" className="card-image" />
      </button>

      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          type="button"
          aria-pressed={isLiked}
        >
          <img src={heartSrc} alt="like" className="card-image" />
        </button>
      </div>
    </div>
  );
}

export default Card;
