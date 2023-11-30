import "./CountrySelect.scss";
import React from "react";
import Globe from "../../assets/icons/globe_9811840.svg";
import UKPin from "../../assets/icons/united-kingdom_10283978.svg";
import USPin from "../../assets/icons/united-states_10283916.svg";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import RedAirplane from "../../assets/animations/red_airplane.json";

export default function CountrySelect() {
  const navigate = useNavigate();
  const handleClickMarker = () => {
    navigate("/dashboard");
  };
  return (
    <main>
      <div className="country-select">
        <div className="country-select__wrapper">
          <img
            className="country-select__globe-image"
            src={Globe}
            alt="Globe"
          />
        </div>
        <img
          className="country-select__pin-image"
          src={UKPin}
          alt="UK pin"
          onClick={handleClickMarker}
        />
        <img
          className="country-select__pin-image country-select__pin-image--us"
          src={USPin}
          alt="US pin"
        />
        <div className="country-select__wrapper">
          <Player
            autoplay
            loop
            src={RedAirplane}
            style={{ height: "150px", width: "150px" }}
            className="country-select__plain-image-two"
          ></Player>
          <Player
            autoplay
            loop
            src={RedAirplane}
            style={{ height: "150px", width: "150px" }}
            className="country-select__plain-image"
          ></Player>
        </div>
      </div>
    </main>
  );
}
