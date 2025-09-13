import { useEffect } from "react";

function Popup({ isOpen, onClose, children }) {
  // Manejo de tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  // Cerrar si se hace clic fuera o en el botón cerrar
  const handleOverlayClick = (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__button_close")
    ) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__container">
        {children}
        <button
          type="button"
          className="popup__button popup__button_close"
          aria-label="Cerrar"
        />
      </div>
    </div>
  );
}

export default Popup;
