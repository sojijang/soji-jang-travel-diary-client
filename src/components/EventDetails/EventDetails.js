import "./EventDetails.scss";

export default function ShowEvent({
  eventDetails,
  setShowEvent,
  handleShowEdit,
}) {
  return (
    <div className="calendar-activity">
      <button
        className="calendar-feature__button"
        onClick={() => setShowEvent(false)}
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
      <button className="calendar-feature__button" onClick={handleShowEdit}>
        Edit
      </button>
      <button className="calendar-feature__button">Delete</button>
    </div>
  );
}
