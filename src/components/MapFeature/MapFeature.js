import "./MapFeature.scss";
import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationPin from "../../assets/icons/location_6675274.png";
import EditMap from "../../components/EditMap/EditMap";
import AddMap from "../AddMap/AddMap";
import DeleteMap from "../DeleteMap/DeleteMap";
import {
  fetchMapPoint,
  postMapPoint,
  editMapPoint,
  deleteMapPoint,
} from "../../utils/API";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function MapFeature({ currentUser }) {
  const [viewState, setViewState] = useState({
    latitude: 51.5072,
    longitude: -0.118092,
    zoom: 8,
  });
  const [points, setPoints] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [label, setLabel] = useState(null);
  const [description, setDescription] = useState(null);

  const [query, setQuery] = useState("");

  const [editPoint, setEditPoint] = useState(null);
  const [pointId, setPointId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = (point) => {
    setPointId(point.id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
    }
  };

  const handleEdit = (point) => {
    setEditPoint(point);
    setPointId(point.id);
  };

  const handleEditSave = async (event) => {
    event.preventDefault();

    const updatedPoint = {
      user_id: currentUser,
      label: editPoint.label,
      description: editPoint.description,
    };

    try {
      await editMapPoint(pointId, updatedPoint);

      setPoints((prevPoints) =>
        prevPoints.map((point) =>
          point.id == pointId
            ? {
                ...point,
                label: updatedPoint.label,
                description: updatedPoint.description,
              }
            : point
        )
      );
    } catch (error) {
      console.error("Error updating point:", error);
    }
  };

  const handleDelete = async (pointId) => {
    try {
      await deleteMapPoint(pointId);

      const updatedPoints = await fetchMapPoint();

      setPoints(updatedPoints);

      setCurrentPlaceId(null);
      setEditPoint(null);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  return (
    <div>
      <Map
        id="map-container"
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: 425, height: 425 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <SearchBox
          accessToken={process.env.REACT_APP_MAP_TOKEN}
          onRetrieve={handleOnResult}
          mapboxgl={mapboxgl}
          marker={true}
          value={query}
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
                  setIsOpen(false);
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
                  <div className="map-place__wrapper">
                    <label htmlFor="place" className="map-place__label">
                      Label:
                    </label>
                    <p className="map-place__content">{point.label}</p>
                  </div>
                  <div className="map-place__wrapper map-place__wrapper--margin">
                    <label htmlFor="description" className="map-place__label">
                      Description:
                    </label>
                    <p className="map-place__content">{point.description}</p>
                  </div>
                  <div className="map-place__group">
                    <button
                      className="map-place__button"
                      onClick={() => {
                        handleEdit(point);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="map-place__button"
                      onClick={() => {
                        openModal(point);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Popup>
            )}
          </div>
        ))}
        <AddMap
          newPlace={newPlace}
          setCurrentPlaceId={setCurrentPlaceId}
          handleSave={handleSave}
          setLabel={setLabel}
          setDescription={setDescription}
          setNewPlace={setNewPlace}
        />
        <EditMap
          editPoint={editPoint}
          setCurrentPlaceId={setCurrentPlaceId}
          setEditPoint={setEditPoint}
          handleEditSave={handleEditSave}
        />
      </Map>
      <DeleteMap
        handleDelete={handleDelete}
        pointId={pointId}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
}
