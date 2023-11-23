import "./MapFeature.scss";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import MapPoint from "../MapPoint/MapPoint";
import Flag from "../../assets/icons/flag_10552468.png";

export default function MapFeature() {
  const [viewState, setViewState] = useState({
    latitude: 51.5072,
    longitude: -0.118092,
    zoom: 8,
  });
  const [showPopup, setShowPopup] = useState(true);

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
        <Marker longitude={0.1641} latitude={51.5074} anchor="bottom">
          <img
            className="marker__image"
            src={Flag}
            style={{ fontSize: viewState.zoom }}
          />
          {showPopup && (
            <Popup
              longitude={0.1641}
              latitude={51.5074}
              anchor="bottom"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
            >
              <div className="map-place">
                <label htmlFor="place">Place</label>
                <p>Big Ben</p>
                <label htmlFor="description">Description</label>
                <p>Nice view</p>
              </div>
            </Popup>
          )}
        </Marker>
      </Map>
    </div>
  );
}
