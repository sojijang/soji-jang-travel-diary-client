import "./DeleteMap.scss";
import Modal from "react-modal";

const customStyles = {
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
      <div className="delete-popup__content">
        <button onClick={closeModal}>Close</button>
        <form
          onSubmit={() => {
            handleDelete(pointId);
          }}
        >
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
