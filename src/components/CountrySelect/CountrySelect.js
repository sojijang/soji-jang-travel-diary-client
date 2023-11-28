import "./CountrySelect.scss";
import React, { ReactDOM } from "react";
import Globe from "../../assets/icons/globe_9811840.svg";
import UKPin from "../../assets/icons/united-kingdom_9105638.svg";
import KoreaPin from "../../assets/icons/south-korea_9105510.svg";
import Plain from "../../assets/icons/mail_651035.svg";
import PlainTwo from "../../assets/icons/paper-plane_3247958.svg";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function CountrySelect() {
  const navigate = useNavigate();
  const handleClickMarker = () => {
    navigate("/dashboard");
  };
  return (
    <main>
      <div className="country-select">
        <img className="country-select__globe-image" src={Globe} alt="Globe" />
        <img
          className="country-select__pin-image"
          src={UKPin}
          alt="UK pin"
          onClick={handleClickMarker}
        />
        <img
          className="country-select__pin-image country-select__pin-image--Korea"
          src={KoreaPin}
          alt="Korea pin"
        />
        <img
          className="country-select__plain-image-two"
          src={PlainTwo}
          alt="Plain icon"
        />
        <img
          className="country-select__plain-image"
          src={Plain}
          alt="Plain icon"
        />
      </div>
    </main>
  );
}
