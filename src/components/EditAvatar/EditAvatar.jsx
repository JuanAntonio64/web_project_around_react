import CloseIcon from "../../images/Close_Icon.svg";

function EditAvatar(props) {
  const { onClose, children } = props;
  return (
    <div className="popup popup_opened" id="popup-editAvatar">
      <div className="popup__container">
        <button
          type="button"
          className="popup__button popup__button_close"
          id="close-button-editAvatar"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="close" className="popup__image-close" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default EditAvatar;
