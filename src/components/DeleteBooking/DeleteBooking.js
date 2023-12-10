import "./DeleteBooking.scss";
import Modal from "react-modal";

const customStyles = {
  content: {
    height: "15rem",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function DeleteMap({
  isDeleteOpen,
  closeDeleteModal,
  flightId,
  handleDeleteFlight,
}) {
  return (
    <Modal
      isOpen={isDeleteOpen}
      onRequestClose={closeDeleteModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="delete-booking-popup__container">
        <button
          className="delete-booking-popup__button"
          onClick={closeDeleteModal}
        >
          Close
        </button>
        <form
          className="delete-booking-popup__form"
          onSubmit={(event) => {
            handleDeleteFlight(event, flightId);
          }}
        >
          <h2 className="delete-booking-popup__title">Delete</h2>
          <p className="delete-booking-popup__text">
            Would you like to delete?
          </p>
          <button
            type="submit"
            className="delete-booking-popup__button delete-map-popup__button--delete"
          >
            Delete
          </button>
        </form>
      </div>
    </Modal>
  );
}
