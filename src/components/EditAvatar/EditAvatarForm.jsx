import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function EditAvatarForm() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");

  function handleChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({ avatar }); // ✅ Llama a la API desde App
  }

  return (
    <form
      className="popup__form popup__form-add"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="popup__subtitle">Cambiar foto de perfil</h2>
      <fieldset className="popup__content">
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_url"
            placeholder="URL de la foto de perfil"
            id="profile-input"
            name="profile-input"
            value={avatar}
            onChange={handleChange}
            required
          />
          <span className="popup__input-error profile-input-error"></span>
        </label>
        <button type="submit" className="popup__button popup__button_save">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}

export default EditAvatarForm;
