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
      <button onClick={closeModal} style={customStyles}>
        close
      </button>
      <div>
        <h3>Flight</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="departure">Departure</label>
          <br />
          <input
            type="text"
            id="departure"
            name="departure"
            placeholder="Departure Location"
          />
          <br />
          <label htmlFor="departure_ETD">ETD</label>
          <br />
          <div>
            <DateTimePicker
              onChange={handleDepartureETD}
              value={departureETD}
              format="y-MM-dd H:mm"
            />
          </div>
          <label htmlFor="departure_ETA">ETA</label>
          <br />
          <div>
            <DateTimePicker
              onChange={handleDepartureETA}
              value={departureETA}
              format="y-MM-dd H:mm"
            />
          </div>
          <label htmlFor="Arrival">Arrival</label>
          <br />
          <input
            type="text"
            id="arrival"
            name="arrival"
            placeholder="Arrival Location"
          />
          <br />
          <label htmlFor="Arrival_ETD">ETD</label>
          <br />
          <div>
            <DateTimePicker
              onChange={handleArrivalETD}
              value={arrivalETD}
              format="y-MM-dd H:mm"
            />
          </div>
          <label htmlFor="Arrival_ETA">ETA</label>
          <br />
          <div>
            <DateTimePicker
              onChange={handleArrivalETA}
              value={arrivalETA}
              format="y-MM-dd H:mm"
            />
          </div>
          <label htmlFor="budget">Budget</label>
          <br />
          <input type="text" id="budget" name="budget" placeholder="Budget" />
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </Modal>
  );
}
