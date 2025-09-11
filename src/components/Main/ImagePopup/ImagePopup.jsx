import CloseIcon from "../../../images/Close_Icon.svg";

function ImagePopup({ card, onClose }) {
  if (!card) return null; 
  
  return (
    <div className="popup popup_opened" id="popup-image">
      <div className="popup__container popup__container-image">
        <button
          type="button"
          className="popup__button popup__button_close"
          id="close-button-image"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="close" className="popup__image-close" />
        </button>
        <img
          src={card.link}
          alt={card.name}
          className="popup__image-modal"
        />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
