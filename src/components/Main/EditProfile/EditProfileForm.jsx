function EditProfileForm() {
  return (
    <form className="popup__form popup__form-add" noValidate>
      <h2 className="popup__subtitle">Nuevo Lugar</h2>
      <fieldset className="popup__content">
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_title"
            placeholder="Título"
            minLength="2"
            maxLength="30"
            id="title-input"
            name="title-input"
            required
          />
          <span className="popup__input-error title-input-error"></span>
        </label>

        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_url"
            placeholder="Enlace de la imagen"
            id="url-input"
            name="url-input"
            required
          />
          <span className="popup__input-error url-input-error"></span>
        </label>

        <button type="submit" className="popup__button popup__button_save">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}

export default EditProfileForm;
