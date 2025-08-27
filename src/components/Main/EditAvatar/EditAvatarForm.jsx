function EditAvatarForm() {
  return (
    <form className="popup__form popup__form-add" noValidate>
      <h2 className="popup__subtitle">Cambiar foto de perfil</h2>
      <fieldset className="popup__content">
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_url"
            placeholder="URL de la foto de perfil"
            id="profile-input"
            name="profile-input"
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
