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
        <div className="detail-popup__box">
          <p className="detail-popup__subtitle">Date: </p>
          <p className="detail-popup__content"> {eventDetails.start}</p>
        </div>
        <div className="detail-popup__box">
          <p className="detail-popup__subtitle">Location: </p>
          <p className="detail-popup__content"> {eventDetails.title}</p>
        </div>
        <div className="detail-popup__wrapper">
          <p className="detail-popup__subtitle">Morning:</p>
          <p className="detail-popup__content"> {eventDetails.AMplan}</p>
        </div>

        <div className="detail-popup__wrapper">
          <p className="detail-popup__subtitle">Afternoon:</p>
          <p className="detail-popup__content"> {eventDetails.PMplan}</p>
        </div>
        <div className="detail-popup__box">
          <p className="detail-popup__subtitle">Budget: </p>
          <p className="detail-popup__content"> {eventDetails.budget}</p>
        </div>

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
