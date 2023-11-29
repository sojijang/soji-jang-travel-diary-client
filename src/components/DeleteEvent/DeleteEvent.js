import "./DeleteEvent.scss";
import Modal from "react-modal";

const customStyles = {
  content: {
    height: "250px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function DeleteEvent({
  handleDelete,
  activityId,
  isDeleteOpen,
  closeDeleteModal,
}) {
  return (
    <Modal
      isOpen={isDeleteOpen}
      onRequestClose={closeDeleteModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="delete-popup">
        <form
          className="delete-popup__form"
          onSubmit={() => {
            handleDelete(activityId);
            closeDeleteModal();
          }}
        >
          <button className="delete-popup__button" onClick={closeDeleteModal}>
            Exit
          </button>
          <h2 className="delete-popup__title">Delete</h2>
          <p className="delete-popup__text">Would you like to delete?</p>
          <button
            className="delete-popup__button delete-popup__button--delete"
            type="submit"
          >
            Delete
          </button>
        </form>
      </div>
    </Modal>
  );
}
