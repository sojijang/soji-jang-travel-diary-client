import "./BookingInformation.scss";
import AddBooking from "../AddBooking/AddBooking";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import {
  fetchFlight,
  fetchOneFlight,
  postFlight,
  editFlight,
  deleteFlight,
} from "../../utils/API";

Modal.setAppElement("#root");

export default function BookingInformation({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [flights, setFlights] = useState([]);

  const [departureETD, setDepartureETD] = useState(new Date());
  const [departureETA, setDepartureETA] = useState(new Date());
  const [arrivalETD, setArrivalETD] = useState(new Date());
  const [arrivalETA, setArrivalETA] = useState(new Date());
  // const [departureLocation, setDepartureLocation] = useState("");
  // const [arrivalLocation, setArrivalLocation] = useState("");
  // const [budget, setBudget] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openInfo = () => {
    setShowInfo(!showInfo);
  };

  const formatDateForBackend = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleDepartureETD = (date) => {
    const formattedDate = formatDateForBackend(date);
    setDepartureETD(formattedDate);
  };

  const handleDepartureETA = (date) => {
    const formattedDate = formatDateForBackend(date);
    setDepartureETA(formattedDate);
  };

  const handleArrivalETD = (date) => {
    const formattedDate = formatDateForBackend(date);
    setArrivalETD(formattedDate);
  };

  const handleArrivalETA = (date) => {
    const formattedDate = formatDateForBackend(date);
    setArrivalETA(formattedDate);
  };

  useEffect(() => {
    const getFlights = async () => {
      try {
        const data = await fetchFlight();

        setFlights(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFlights();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedBudget = parseFloat(event.target.budget.value.trim());

    const newFlight = {
      user_id: currentUser,
      departure_location: event.target.departure.value,
      departure_etd: departureETD,
      departure_eta: departureETA,
      return_location: event.target.arrival.value,
      return_etd: arrivalETD,
      return_eta: arrivalETA,
      budget: parsedBudget,
    };

    try {
      console.log("Request Payload:", newFlight);

      const data = await postFlight(newFlight);
      console.log("Flight submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting flight:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString(undefined, options);
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
      <AddBooking
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        handleDepartureETD={handleDepartureETD}
        departureETD={departureETD}
        handleDepartureETA={handleDepartureETA}
        departureETA={departureETA}
        handleArrivalETD={handleArrivalETD}
        arrivalETD={arrivalETD}
        handleArrivalETA={handleArrivalETA}
        arrivalETA={arrivalETA}
      />
      {showInfo && (
        <div>
          <h3>Flight</h3>
          {flights.map((flight) => (
            <div key={flight.id}>
              <p>Departure: {flight.depature_location}</p>
              <p>ETD: {formatDate(flight.departure_etd)}</p>
              <p>ETA: {formatDate(flight.departure_eta)}</p>
              <p>Arrival: {flight.return_location}</p>
              <p>ETD: {formatDate(flight.return_etd)}</p>
              <p>ETA: {formatDate(flight.return_eta)}</p>
              <p>Budget: {flight.budget}</p>
            </div>
          ))}
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
