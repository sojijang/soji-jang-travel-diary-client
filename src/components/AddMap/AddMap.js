import "./AddMap.scss";
import { Popup } from "react-map-gl";
import { useState } from "react";


export default function AddMap({
  newPlace,
  setCurrentPlaceId,
  handleSave,
  setLabel,
  setDescription,
  setNewPlace,
}) {
  const handleClose = () => {
    setCurrentPlaceId(null);
    setNewPlace(null);
  };

  const [labelError, setLabelError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const validateField = (fieldName) => {
    const value = document.getElementById(fieldName).value;
    switch (fieldName) {
      case "label":
        setLabelError(value.trim() === "");
        break;
      case "description":
        setDescriptionError(value.trim() === "");
        break;

      default:
        break;
    }
  };

  return (
    <article className="add-map-popup">
      {newPlace && (
        <Popup
          longitude={newPlace.lng}
          latitude={newPlace.lat}
          anchor="top"
          closeButton={true}
          closeOnClick={false}
          onClose={handleClose}
        >
          <div className="add-map-popup__wrapper">
            <form
              className="add-map-popup__form"
              onSubmit={(event) => {
                handleSave(event);
                handleClose();
              }}
            >
              <div className="add-map-popup__wrapper">
                <label htmlFor="label" className="add-map-popup__label">
                  Choose a category
                </label>
                <select
                  className={`add-map-popup__select ${
                    labelError ? "error" : ""
                  }`}
                  onBlur={() => validateField("label")}
                  name="label"
                  id="label"
                  onChange={(event) => setLabel(event.target.value)}
                >
                  <option className="add-map-popup__option" value="restaurant">
                    Restaurant
                  </option>
                  <option className="add-map-popup__option" value="cafe">
                    Cafe
                  </option>
                  <option className="add-map-popup__option" value="sightseeing">
                    Sightseeing
                  </option>
                  <option
                    className="add-map-popup__option"
                    value="entertainment"
                  >
                    Entertainment
                  </option>
                  <option className="add-map-popup__option" value="activity">
                    Activity
                  </option>
                </select>
              </div>
              {labelError && (
                <p className="error-message">Label is required.</p>
              )}

              <div className="add-map-popup__wrapper">
                <label htmlFor="description" className="add-map-popup__label">
                  Description
                </label>
                <textarea
                  className={`add-map-popup__input ${
                    descriptionError ? "error" : ""
                  }`}
                  onBlur={() => validateField("description")}
                  name="description"
                  id="description"
                  cols="20"
                  rows="5"
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
              {descriptionError && (
                <p className="error-message">Description is required.</p>
              )}

              <button type="submit" className="add-map-popup__button">
                Save
              </button>
            </form>
          </div>
        </Popup>
      )}
    </article>
  );
}
