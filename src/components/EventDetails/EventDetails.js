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
  closeEditModal,
}) {
  const handleDeleteClick = () => {
    openDeleteModal();
    closeEditModal();
  };

  const handleEditClick = () => {
    openEditModal();
    closeDetailModal();
  };

  return (
    <Modal
      isOpen={isDetailOpen}
      onRequestClose={closeDetailModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="detail-popup">
        <button className="detail-popup__button" onClick={closeDetailModal}>
          Exit
        </button>
        <h2 className="detail-popup__title">EVENT DETAILS</h2>
        <p className="detail-popup__subtitle">Date: {eventDetails.start}</p>
        <p className="detail-popup__subtitle">Location: {eventDetails.title}</p>
        <div className="detail-popup__wrapper">
          <p className="detail-popup__subtitle">Morning:</p>
          <p className="detail-popup__content"> {eventDetails.AMplan}</p>
          <p className="detail-popup__subtitle">Afternoon:</p>
          <p className="detail-popup__content"> {eventDetails.PMplan}</p>
        </div>
        <p className="detail-popup__subtitle">Budget: {eventDetails.budget}</p>
        <div className="detail-popup__group">
          <button
            className="detail-popup__button detail-popup__button--edit"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button className="detail-popup__button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
