import "./DeleteEvent.scss";
import Modal from "react-modal";

const customStyles = {
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
      <div className="delete-popup__content">
        <form
          onSubmit={() => {
            handleDelete(activityId);
          }}
        >
          <button className="delete-popup__button" onClick={closeDeleteModal}>
            Exit
          </button>
          <h2 className="delete-popup__title">Delete?</h2>
          <p className="delete-popup__text">
            Please confirm that you'd like to delete. You won't be able to undo
            this action.
          </p>
          <button type="submit">Delete</button>
        </form>
      </div>
    </Modal>
  );
}
