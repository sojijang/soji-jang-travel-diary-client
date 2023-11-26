import "./AddBooking.scss";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //   },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function AddBooking({ isOpen, closeModal, handleSave }) {
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
        <form onSubmit={handleSave}>
          <label htmlFor="departure">Departure</label>
          <br />
          <input
            type="text"
            id="departure"
            name="departure"
            placeholder="Departure Location"
          />
          <br />
          <label htmlFor="ETD">Time</label>
          <br />
          <input type="text" id="ETD" name="ETD" placeholder="ETD" />
          <br />
          <label htmlFor="ETA">Time</label>
          <br />
          <input type="text" id="ETA" name="ETA" placeholder="ETA" />
          <br />
          <label htmlFor="Arrival">Arrival</label>
          <br />
          <input
            type="text"
            id="Arrival"
            name="Arrival"
            placeholder="Arrival Location"
          />
          <br />
          <label htmlFor="ETD">Time</label>
          <br />
          <input type="text" id="ETD" name="ETD" placeholder="ETD" />
          <br />
          <label htmlFor="ETA">Time</label>
          <br />
          <input type="text" id="ETA" name="ETA" placeholder="ETA" />
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </Modal>
  );
}
