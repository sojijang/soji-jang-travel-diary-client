import "./MapFeature.scss";
import React, { useRef, useEffect, useState } from "react";
import Map, { Marker, Popup, Layer, Feature } from "react-map-gl";
import { SearchBox, AddressAutofill } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/search-js-react/css/style.css";
import LocationPin from "../../assets/icons/location_6675274.png";
import MapPoint from "../MapPoint/MapPoint";

import {
  fetchMapPoint,
  fetchOneMapPoint,
  postMapPoint,
  editMapPoint,
  deleteMapPoint,
} from "../../utils/API";

export default function MapFeature({ currentUser }) {
  const [value, setValue] = useState("");
  const [viewState, setViewState] = useState({
    latitude: 51.5072,
    longitude: -0.118092,
    zoom: 8,
  });
  const [points, setPoints] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [dbPlace, setDbPlace] = useState(null);
  const [label, setLabel] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const getPoints = async () => {
      try {
        const data = await fetchMapPoint();

        setPoints(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPoints();
  }, []);

  const handleOnResult = (result) => {
    setViewState({
      latitude: result.features[0].geometry.coordinates[1],
      longitude: result.features[0].geometry.coordinates[0],
      zoom: 13,
    });

    setNewPlace({
      lat: result.features[0].geometry.coordinates[1],
      lng: result.features[0].geometry.coordinates[0],
    });
  };

  const handleClickMarker = (id) => {
    setCurrentPlaceId(id);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (newPlace) {
      const newMapPoint = {
        user_id: currentUser,
        label,
        description,
        lat: newPlace.lat,
        lng: newPlace.lng,
      };

      try {
        const data = await postMapPoint(newMapPoint);

        setPoints([...points, data]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("newPlace is null. Unable to save the map point.");
    }
  };

  return (
    <div>
      <Map
        id="map-container"
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: 390, height: 390 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <SearchBox
          accessToken={process.env.REACT_APP_MAP_TOKEN}
          value={query}
          onRetrieve={handleOnResult}
          mapboxgl={mapboxgl}
          marker={true}
          theme={{
            variables: {
              fontFamily: "Avenir, sans-serif",
              unit: "14px",
              padding: "0.5em",
              borderRadius: "0",
              boxShadow: "0 0 0 1px silver",
            },
          }}
        />
        <form>
          <AddressAutofill accessToken={process.env.REACT_APP_MAP_TOKEN}>
            <input
              autoComplete="shipping address-line1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </AddressAutofill>
        </form>

        {points.map((point) => (
          <div key={point.id}>
            <Marker
              className="marker"
              longitude={point.lng}
              latitude={point.lat}
              anchor="bottom"
            >
              <img
                className="marker__image"
                src={LocationPin}
                style={{ font: viewState.zoom }}
                alt="Marker"
                onClick={() => {
                  handleClickMarker(point.id);
                }}
              />
            </Marker>

            {point.id === currentPlaceId && (
              <Popup
                longitude={point.lng}
                latitude={point.lat}
                anchor="top"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="map-place">
                  <label htmlFor="place">Label</label>
                  <p>{point.label}</p>
                  <label htmlFor="description">Description</label>
                  <p>{point.description}</p>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </Popup>
            )}
          </div>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="top"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setCurrentPlaceId(null)}
          >
            <div>
              <form onSubmit={handleSave}>
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
      </Map>
    </div>
  );
}
