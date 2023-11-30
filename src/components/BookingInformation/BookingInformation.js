import "./BookingInformation.scss";
import AddBooking from "../AddBooking/AddBooking";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  fetchFlight,
  postFlight,
  deleteFlight,
} from "../../utils/API";
import FlightTicket from "../../assets/icons/ticket_7591340.svg";
import EditBooking from "../EditBooking/EditBooking";
import DeleteBooking from "../DeleteBooking/DeleteBooking";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function BookingInformation({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [flights, setFlights] = useState([]);
  const [flightId, setFlightId] = useState(null);

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

  const openInfoModal = () => {
    setIsInfoOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoOpen(false);
  };

  const openDeleteModal = (flight) => {
    setIsDeleteOpen(true);
    setIsInfoOpen(false);
    setFlightId(flight.id);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const openEditModal = (flight) => {
    setIsEditOpen(true);
    setIsInfoOpen(false);
    setFlightId(flight.id);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
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

    const isDepartureValid = event.target.departure.value.trim() !== "";
    const isArrivalValid = event.target.arrival.value.trim() !== "";

    if (!isDepartureValid || !isArrivalValid) {
      return;
    }

    const parsedBudget = parseFloat(event.target.budget.value.trim());

    const newFlight = {
      user_id: currentUser,
      departure_location: event.target.departure.value,
      departure_etd: formatDateForBackend(departureETD),
      return_location: event.target.arrival.value,
      return_eta: formatDateForBackend(arrivalETA),
      budget: parsedBudget,
    };

    try {
      const data = await postFlight(newFlight);

      setFlights([...flights, data]);
    } catch (error) {
      console.error(error.response.data);
    }
    closeModal();
  };

  const handleDeleteFlight = async (flightId) => {
    try {
      await deleteFlight(flightId);

      setFlights((prevFlights) =>
        prevFlights.filter((flight) => flight.id !== flightId)
      );
    } catch (error) {
      console.error(error);
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
    <article className="booking">
      <div className="booking__container">
        <div className="booking__wrapper">
          <img
            className="booking__icon"
            src={FlightTicket}
            alt="Flight ticket"
          />
          <h2 className="booking__title">Booking Information</h2>
        </div>
        <div className="booking__wrapper booking__info">
          <button onClick={openModal} className="booking__button">
            Add Flight
          </button>
          <button onClick={openInfoModal} className="booking__button">
            See Flight Here
          </button>
        </div>
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
      <EditBooking
        isEditOpen={isEditOpen}
        closeEditModal={closeEditModal}
        departureETD={departureETD}
        arrivalETA={arrivalETA}
        handleDepartureETD={handleDepartureETD}
        handleArrivalETA={handleArrivalETA}
        flight={flights.find((flight) => flight.id === flightId)}
      />
      <DeleteBooking
        isDeleteOpen={isDeleteOpen}
        closeDeleteModal={closeDeleteModal}
        flightId={flightId}
        handleDeleteFlight={handleDeleteFlight}
      />
      <Modal
        isOpen={isInfoOpen}
        onRequestClose={closeInfoModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div className="flight">
          <button
            className="flight__button booking__button"
            onClick={closeInfoModal}
            style={customStyles}
          >
            Close
          </button>
          {flights.map((flight) => (
            <div key={flight.id} className="flight__article">
              <div className="flight__wrapper">
                <p className="flight__subtitle">Departure:</p>
                <p className="flight__text">{flight.departure_location}</p>
              </div>
              <div className="flight__wrapper">
                <p className="flight__subtitle">ETD:</p>
                <p className="flight__text">
                  {formatDate(flight.departure_etd)}
                </p>
              </div>
              <div className="flight__wrapper">
                <p className="flight__subtitle">Arrival:</p>
                <p className="flight__text">{flight.return_location}</p>
              </div>
              <div className="flight__wrapper">
                <p className="flight__subtitle">ETA:</p>
                <p className="flight__text">{formatDate(flight.return_eta)}</p>
              </div>
              <p className="flight__subtitle">Price: {flight.budget}</p>
              <div className="flight__wrapper flight__wrapper--button">
                <button
                  className="booking__button"
                  onClick={() => {
                    openEditModal(flight);
                  }}
                >
                  Edit
                </button>
                <button
                  className="booking__button"
                  onClick={() => {
                    openDeleteModal(flight);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={openModal}
            className="booking__button booking__button--add"
          >
            Add more
          </button>
        </div>
      </Modal>
    </article>
  );
}
