import "./CountrySelect.scss";
import React, { ReactDOM } from "react";
import Globe from "../../assets/icons/globe_9811840.svg";
import PushPin from "../../assets/icons/united-kingdom_8463455.svg";
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
          src={PushPin}
          alt="Push Pin"
          onClick={handleClickMarker}
        />
        <img className="country-select__plain-image-two" src={PlainTwo} alt="" />
        <img className="country-select__plain-image" src={Plain} alt="" />
      </div>
    </main>
  );
}
