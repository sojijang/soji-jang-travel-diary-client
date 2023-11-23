import "./MapFeature.scss";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import MapPoint from "../MapPoint/MapPoint";
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
  const [showPopup, setShowPopup] = useState(true);
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
        {points.map((point) => (
          <div key={point.id}>
            <Marker longitude={point.lng} latitude={point.lat} anchor="bottom">
              <img
                className="marker__image"
                src={Flag}
                style={{ fontSize: viewState.zoom }}
                alt="Marker"
              />
            </Marker>
            <Popup
              longitude={point.lng}
              latitude={point.lat}
              anchor="top"
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
          </div>
        ))}
      </Map>
    </div>
  );
}
