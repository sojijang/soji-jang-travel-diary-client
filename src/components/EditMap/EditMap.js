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
          <div>
            <form
              onSubmit={(event) => {
                handleEditSave(event);
                handleClose();
              }}
            >
              <div>
                <label htmlFor="label">Choose a category</label>
                <br />
                <select
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
                onChange={(event) => {
                  setEditPoint({
                    ...editPoint,
                    description: event.target.value,
                  });
                }}
                value={editPoint.description}
              ></textarea>
              <button type="submit">Save</button>
            </form>
          </div>
        </Popup>
      )}
    </div>
  );
}
