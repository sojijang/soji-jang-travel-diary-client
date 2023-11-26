import "./EventDetails.scss";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function ShowEvent({
  eventDetails,
  openEditModal,
  isDetailOpen,
  closeDetailModal,
  openDeleteModal,
}) {
  return (
    <Modal
      isOpen={isDetailOpen}
      onRequestClose={closeDetailModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div>
        <button
          className="calendar-activity__button"
          onClick={closeDetailModal}
        >
          Exit
        </button>
        <h2>EVENT DETAILS</h2>
        <p>Date: {eventDetails.start}</p>
        <p>Location: {eventDetails.title}</p>
        <div className="calendar-activity__plan-notes">
          <p>Morning</p>
          <p> {eventDetails.AMplan}</p>
          <p>Afternoon</p>
          <p> {eventDetails.PMplan}</p>
        </div>
        <p>Budget: {eventDetails.budget}</p>
        <button className="calendar-feature__button" onClick={openEditModal}>
          Edit
        </button>
        <button className="calendar-feature__button" onClick={openDeleteModal}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
