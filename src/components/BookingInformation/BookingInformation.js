import "./BookingInformation.scss";
import AddBooking from "../AddBooking/AddBooking";
import React, { useEffect, useState } from "react";
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openInfo = () => {
    setShowInfo(!showInfo);
  };

  const formatDateForBackend = (dateString) => {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:00`;

    return formattedDate;
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
      departure_etd: formatDateForBackend(departureETD),
      departure_eta: formatDateForBackend(departureETA),
      return_location: event.target.arrival.value,
      return_etd: formatDateForBackend(arrivalETD),
      return_eta: formatDateForBackend(arrivalETA),
      budget: parsedBudget,
    };

    try {
      const data = await postFlight(newFlight);

      console.log(data);
      setFlights([...flights, data]);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}, ${hours}:${minutes} ${
      date.getHours() >= 12 ? "PM" : "AM"
    }`;

    return formattedDate;
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
              <p>Departure: {flight.departure_location}</p>
              <p>ETD: {formatDate(flight.departure_etd)}</p>
              <p>ETA: {formatDate(flight.departure_eta)}</p>
              <p>Arrival: {flight.return_location}</p>
              <p>ETD: {formatDate(flight.return_etd)}</p>
              <p>ETA: {formatDate(flight.return_eta)}</p>
              <p>Budget: {flight.budget}</p>
            </div>
          ))}
          <button onClick={openModal}>Add more</button>
        </div>
      )}
    </article>
  );
}
