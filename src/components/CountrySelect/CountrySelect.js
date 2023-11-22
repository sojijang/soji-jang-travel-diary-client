import "./CountrySelect.scss";
import React, { ReactDOM } from "react";
import Globe from "../../assets/icons/earth_2035985.png";
import PushPin from "../../assets/icons/location_6675274.png";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function CountrySelect() {
  const navigate = useNavigate();

  const handleClickMarker = () => {
    navigate("/dashboard");
  };

  return (
    <div className="country-select">
      <h2 className="country-select__text">Click</h2>
      <img className="country-select__globe-image" src={Globe} alt="Globe" />
      <img
        className="country-select__pin-image"
        src={PushPin}
        alt="Push Pin"
        onClick={handleClickMarker}
      />
    </div>
  );
}
