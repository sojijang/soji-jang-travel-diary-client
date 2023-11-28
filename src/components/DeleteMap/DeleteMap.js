import "./DeleteMap.scss";
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
  handleDelete,
  pointId,
  isOpen,
  closeModal,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="delete-map-popup__container">
        <button className="delete-map-popup__button" onClick={closeModal}>
          Close
        </button>
        <form
          className="delete-map-popup__form"
          onSubmit={() => {
            handleDelete(pointId);
          }}
        >
          <h2 className="delete-map-popup__title">Delete</h2>
          <p className="delete-map-popup__text">Would you like to delete?</p>
          <button
            type="submit"
            className="delete-map-popup__button delete-map-popup__button--delete"
          >
            Delete
          </button>
        </form>
      </div>
    </Modal>
  );
}
