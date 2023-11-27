import "./AddBooking.scss";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const customStyles = {
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
  handleDepartureETA,
  departureETA,
  handleArrivalETD,
  arrivalETD,
  handleArrivalETA,
  arrivalETA,
}) {
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
              className="add-booking__input"
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
          <div className="add-booking__wrapper">
            <label htmlFor="departure_ETA" className="add-booking__label">
              ETA
            </label>
          </div>
          <div className="add-booking__wrapper">
            <DateTimePicker
              onChange={handleDepartureETA}
              value={departureETA}
              format="y-MM-dd H:mm"
              className="add-booking__select"
            />
          </div>
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
              className="add-booking__input"
            />
          </div>
          <div className="add-booking__wrapper">
            <label htmlFor="Arrival_ETD" className="add-booking__label">
              ETD
            </label>
          </div>
          <div className="add-booking__wrapper">
            <DateTimePicker
              onChange={handleArrivalETD}
              value={arrivalETD}
              format="y-MM-dd H:mm"
              className="add-booking__select"
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
          <div className="add-booking__wrapper">
            <label htmlFor="budget" className="add-booking__label">
              Budget
            </label>
          </div>
          <div className="add-booking__wrapper">
            <input
              type="text"
              id="budget"
              name="budget"
              className="add-booking__input"
            />
          </div>
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
