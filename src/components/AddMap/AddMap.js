import "./AddMap.scss";
import Map, { Marker, Popup, Layer, Feature } from "react-map-gl";

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
                  className="add-map-popup__select"
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
              <div className="add-map-popup__wrapper">
                <label htmlFor="description" className="add-map-popup__label">
                  Description
                </label>
                <textarea
                  className="add-map-popup__input"
                  name="description"
                  id="description"
                  cols="20"
                  rows="5"
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
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
