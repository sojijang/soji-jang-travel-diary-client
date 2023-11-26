import "./BookingInformation.scss";
import AddBooking from "../AddBooking/AddBooking";
import { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function BookingInformation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openInfo = () => {
    setShowInfo(true);
  };

  return (
    <article>
      <div>
        <h2>Booking Information</h2>
        <p>Please log in to save booking information</p>
        <button onClick={openModal}>Add Flight</button>
        <br />
        <button onClick={openInfo}>Click to see</button>
      </div>
      <AddBooking isOpen={isOpen} closeModal={closeModal} />
      {showInfo && (
        <div>
          <div>
            <h3>Flight</h3>
            <p>Departure</p>
            <p>Airline</p>
            <p>ETD</p>
            <p>ETA</p>
            <p>Arrival</p>
            <p>Airline</p>
            <p>ETD</p>
            <p>ETA</p>
          </div>
          <div>
            <h3>Hotel</h3>
            <p>Location</p>
            <p>Date</p>
          </div>
          <button onClick={openModal}>Add more</button>
        </div>
      )}
    </article>
  );
}
