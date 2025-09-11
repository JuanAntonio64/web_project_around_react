import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext.js";

function EditProfileForm() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <form
      className="popup__form popup__form-edit"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="popup__subtitle">Editar perfil</h2>
      <fieldset className="popup__content">
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_name"
            placeholder="Nombre"
            minLength="2"
            maxLength="40"
            id="name-input"
            name="name"
            value={name}
            onChange={handleChangeName}
            required
          />
          <span className="popup__input-error name-input-error"></span>
        </label>

        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_job"
            placeholder="Acerca de mí"
            minLength="2"
            maxLength="200"
            id="about-input"
            name="about"
            value={description}
            onChange={handleChangeDescription}
            required
          />
          <span className="popup__input-error about-input-error"></span>
        </label>

        <button type="submit" className="popup__button popup__button_save">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}

export default EditProfileForm;
