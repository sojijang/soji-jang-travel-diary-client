import "./DeleteMap.scss";

export default function DeleteMap({ handleDelete, pointId, setShowDelete }) {
  return (
    <article className="delete-popup">
      <div className="delete-popup__content">
        <button onClick={() => setShowDelete(false)}>Close</button>
        <h2 className="delete-popup__title">Delete?</h2>
        <p className="delete-popup__text">
          Please confirm that you'd like to delete. You won't be able to undo
          this action.
        </p>
        <button>Cancel</button>
        <button
          onClick={() => {
            handleDelete(pointId);
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
