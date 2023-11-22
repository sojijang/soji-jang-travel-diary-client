import "./DeleteEvent.scss";

export default function DeleteEvent({ handleDelete, activityId }) {
  return (
    <article className="delete-popup">
      <div className="delete-popup__content">
        <h2 className="delete-popup__title">Delete?</h2>
        <p className="delete-popup__text">
          Please confirm that you'd like to delete. You won't be able to undo
          this action.
        </p>
        <button>Cancel</button>
        <button
          onClick={() => {
            handleDelete(activityId);
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
