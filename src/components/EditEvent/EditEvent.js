import "./EditEvent.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function EditEvent({
  eventDetails,
  setEventDetails,
  handleSave,
}) {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setStartDate(date);
    setEventDetails({
      ...eventDetails,
      start: date.toISOString().split("T")[0],
    });
  };

  return (
    <div className="edit-popup">
      <h2 className="edit-popup__title">Edit Event</h2>
      <form onClick={handleSave} className="edit-popup__form">
        <p className="edit-popup__subtitle">Date</p>
        <DatePicker selected={startDate} onChange={handleDateSelect} />
        {/* check here */}
        <p className="edit-popup">Location:</p>
        <input
          type="text"
          className="edit-popup__input"
          name="location"
          id="location"
          value={eventDetails.title}
          onChange={(event) => {
            setEventDetails({
              ...eventDetails,
              title: event.target.value,
            });
          }}
        />
        <div className="edit-popup-plan">
          <p className="edit-popup__subtitle">Morning</p>
          <textarea
            cols="30"
            rows="10"
            className="edit-popup__task"
            name="morning_task"
            id="morning_task"
            value={eventDetails.AMplan}
            onChange={(event) => {
              setEventDetails({
                ...eventDetails,
                AMplan: event.target.value,
              });
            }}
          ></textarea>
        </div>
        <div className="edit-popup-plan">
          <p className="edit-popup__subtitle">Afternoon</p>
          <textarea
            cols="30"
            rows="10"
            className="edit-popup__task"
            name="afternoon_task"
            id="afternoon_task"
            value={eventDetails.PMplan}
            onChange={(event) => {
              setEventDetails({
                ...eventDetails,
                PMplan: event.target.value,
              });
            }}
          ></textarea>
        </div>
        <br />
        <p>Budget</p>
        <input
          type="text"
          className="edit-popup__input"
          name="budget"
          id="budget"
          value={eventDetails.budget}
          onChange={(event) => {
            setEventDetails({
              ...eventDetails,
              budget: event.target.value,
            });
          }}
        />
        <br />
        <button type="submit">Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
