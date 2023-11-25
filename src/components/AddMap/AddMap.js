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
    <div>
      {newPlace && (
        <Popup
          longitude={newPlace.lng}
          latitude={newPlace.lat}
          anchor="top"
          closeButton={true}
          closeOnClick={false}
          onClose={handleClose}
        >
          <div>
            <form
              onSubmit={(event) => {
                handleSave(event);
                handleClose();
              }}
            >
              <div>
                <label htmlFor="label">Choose a category</label>
                <br />
                <select
                  name="label"
                  id="label"
                  onChange={(event) => setLabel(event.target.value)}
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                  <option value="sightseeing">Sightseeing</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="activity">Activity</option>
                </select>
              </div>
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                name="description"
                id="description"
                cols="20"
                rows="5"
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
              <button type="submit">Save</button>
            </form>
          </div>
        </Popup>
      )}
    </div>
  );
}
