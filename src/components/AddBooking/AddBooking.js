import "./AddBooking.scss";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";

const customStyles = {
  content: {
    height: "26.25rem",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function AddBooking({
  isOpen,
  closeModal,
  handleSubmit,
  handleDepartureETD,
  departureETD,
  handleArrivalETA,
  arrivalETA,
}) {
  const [departureError, setDepartureError] = useState(false);
  const [arrivalError, setArrivalError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);

  const validateField = (fieldName) => {
    const value = document.getElementById(fieldName).value;
    switch (fieldName) {
      case "departure":
        setDepartureError(value.trim() === "");
        break;
      case "arrival":
        setArrivalError(value.trim() === "");
        break;
      case "budget":
        setBudgetError(value.trim() === "");
        break;

      default:
        break;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <button
        className="add-booking__button add-booking__button--close"
        onClick={closeModal}
        style={customStyles}
      >
        Close
      </button>
      <div className="add-booking__container">
        <form onSubmit={handleSubmit} className="add-booking__form">
          <div className="add-booking__wrapper">
            <label htmlFor="departure" className="add-booking__label">
              Departure
            </label>
          </div>
          <div className="add-booking__wrapper">
            <input
              type="text"
              id="departure"
              name="departure"
              className={`add-booking__input ${departureError ? "error" : ""}`}
              onBlur={() => validateField("departure")}
            />
          </div>
          <div className="add-booking__wrapper">
            <label htmlFor="departure_ETD" className="add-booking__label">
              ETD
            </label>
          </div>
          <div className="add-booking__wrapper">
            <DateTimePicker
              onChange={handleDepartureETD}
              value={departureETD}
              format="y-MM-dd H:mm"
              className="add-booking__select"
            />
          </div>
          {departureError && (
            <p className="error-message">Departure is required.</p>
          )}

          <div className="add-booking__wrapper">
            <label htmlFor="Arrival" className="add-booking__label">
              Arrival
            </label>
          </div>
          <div className="add-booking__wrapper">
            <input
              type="text"
              id="arrival"
              name="arrival"
              className={`add-booking__input ${arrivalError ? "error" : ""}`}
              onBlur={() => validateField("arrival")}
            />
          </div>
          <div className="add-booking__wrapper">
            <label htmlFor="Arrival_ETA" className="add-booking__label">
              ETA
            </label>
          </div>
          <div className="add-booking__wrapper">
            <DateTimePicker
              onChange={handleArrivalETA}
              value={arrivalETA}
              format="y-MM-dd H:mm"
              className="add-booking__select"
            />
          </div>
          {arrivalError && (
            <p className="error-message">Arrival is required.</p>
          )}
          <div className="add-booking__wrapper">
            <label htmlFor="budget" className="add-booking__label">
              Price
            </label>
          </div>
          <div className="add-booking__wrapper">
            <input
              type="text"
              id="budget"
              name="budget"
              className={`add-booking__input ${budgetError ? "error" : ""}`}
              onBlur={() => validateField("budget")}
            />
          </div>
          {budgetError && <p className="error-message">Price is required.</p>}
          <button
            type="submit"
            className="add-booking__button add-booking__button--save"
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
