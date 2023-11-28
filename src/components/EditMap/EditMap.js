import "./EditMap.scss";
import Map, { Marker, Popup, Layer, Feature } from "react-map-gl";

export default function EditMap({
  editPoint,
  setCurrentPlaceId,
  setEditPoint,
  handleEditSave,
}) {
  const handleClose = () => {
    setCurrentPlaceId(null);
    setEditPoint(null);
  };
  return (
    <div>
      {editPoint !== null && (
        <Popup
          longitude={editPoint.lng}
          latitude={editPoint.lat}
          anchor="top"
          closeButton={true}
          closeOnClick={false}
          onClose={handleClose}
        >
          <div className="edit-map-popup">
            <form
              className="edit-map-popup__form"
              onSubmit={(event) => {
                handleEditSave(event);
                handleClose();
              }}
            >
              <div className="edit-map-popup__wrapper">
                <div className="edit-map-popup__container">
                  <label htmlFor="label" className="edit-map-popup__label">
                    Choose a category
                  </label>
                </div>
                <select
                  className="edit-map-popup__select"
                  name="label"
                  id="label"
                  onChange={(event) => {
                    setEditPoint({
                      ...editPoint,
                      label: event.target.value,
                    });
                  }}
                  value={editPoint.label}
                >
                  <option className="edit-map-popup__option" value="restaurant">
                    Restaurant
                  </option>
                  <option className="edit-map-popup__option" value="cafe">
                    Cafe
                  </option>
                  <option
                    className="edit-map-popup__option"
                    value="sightseeing"
                  >
                    Sightseeing
                  </option>
                  <option
                    className="edit-map-popup__option"
                    value="entertainment"
                  >
                    Entertainment
                  </option>
                  <option className="edit-map-popup__option" value="activity">
                    Activity
                  </option>
                </select>
              </div>
              <div className="edit-map-popup__container">
                <label htmlFor="description" className="edit-map-popup__label">
                  Description
                </label>
              </div>
              <textarea
                className="edit-map-popup__input"
                name="description"
                id="description"
                cols="20"
                rows="3"
                onChange={(event) => {
                  setEditPoint({
                    ...editPoint,
                    description: event.target.value,
                  });
                }}
                value={editPoint.description}
              ></textarea>
              <div className="edit-map-popup__wrapper">
                <button type="submit" className="edit-map-popup__button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Popup>
      )}
    </div>
  );
}
