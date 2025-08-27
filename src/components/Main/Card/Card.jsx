import TrashIcon from "../../../images/Trash.png";
import HeartIcon from "../../../images/hearth.svg";

function Card({ card, onDelete, onLike, onCardClick }) {
  const { name, link, isLiked } = card;

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
        onClick={() => onDelete(card._id)}
        type="button"
      >
        <img src={TrashIcon} alt="trash" className="card-image" />
      </button>

      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={() => onLike(card._id)}
          type="button"
        >
          <img src={HeartIcon} alt="like" className="card-image" />
        </button>
      </div>
    </div>
  );
}

export default Card;
