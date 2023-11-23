import "./MapFeature.scss";
import React, { useRef, useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/search-js-react/css/style.css";
import Flag from "../../assets/icons/flag_10552468.png";

import {
  fetchMapPoint,
  fetchOneMapPoint,
  postMapPoint,
  editMapPoint,
  deleteMapPoint,
} from "../../utils/API";

export default function MapFeature() {
  const [viewState, setViewState] = useState({
    latitude: 51.5072,
    longitude: -0.118092,
    zoom: 8,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [points, setPoints] = useState([]);

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

  const handelShowPopup = () => {
    setShowPopup(true);
  };

  const handleOnResult = (result) => {
    setViewState({
      latitude: result.features[0].geometry.coordinates[1],
      longitude: result.features[0].geometry.coordinates[0],
      zoom: 13,
    });
  };

  return (
    <div>
      <SearchBox
        accessToken={process.env.REACT_APP_MAP_TOKEN}
        onRetrieve={handleOnResult}
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
      <Map
        id="map-container"
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: 390, height: 390 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
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
                src={Flag}
                style={{ font: viewState.zoom }}
                alt="Marker"
                onClick={handelShowPopup}
              />
            </Marker>
            {showPopup && (
              <Popup
                longitude={point.lng}
                latitude={point.lat}
                anchor="bottom"
                closeButton={true}
                closeOnClick={false}
              >
                <div className="map-place">
                  <label htmlFor="place">Place</label>
                  <p>{point.title}</p>
                  <label htmlFor="description">Description</label>
                  <p>{point.description}</p>
                </div>
              </Popup>
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}
