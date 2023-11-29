import "./EditEvent.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function EditEvent({
  eventDetails,
  setEventDetails,
  handleSave,
  isEditOpen,
  closeEditModal,
}) {
  const [startDate, setStartDate] = useState(new Date());

  const [dateError, setDateError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [taskError, setTaskError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);

  const validateField = (fieldName) => {
    const value = document.getElementById(fieldName).value;
    switch (fieldName) {
      case "date":
        setDateError(value.trim() === "");
        break;
      case "location":
        setLocationError(value.trim() === "");
        break;
      case "task":
        setTaskError(value.trim() === "");
        break;
      case "budget":
        setBudgetError(value.trim() === "");

      default:
        break;
    }
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
    setEventDetails({
      ...eventDetails,
      start: date.toISOString().split("T")[0],
    });
  };

  return (
    <Modal
      isOpen={isEditOpen}
      onRequestClose={closeEditModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="edit-popup">
        <button className="edit-popup__button" onClick={closeEditModal}>
          Exit
        </button>
        <h2 className="edit-popup__title">Edit Event</h2>
        <form onSubmit={handleSave} className="edit-popup__form">
          <p className="edit-popup__subtitle">Date</p>
          <DatePicker
            className={`add-popup__input ${dateError ? "error" : ""}`}
            onBlur={() => validateField("date")}
            name="date"
            id="date"
            value={eventDetails.start}
            onChange={handleDateSelect}
          />
          {dateError && <p className="error-message">Date is required.</p>}
          <p className="edit-popup__subtitle">Location:</p>
          <input
            className={`edit-popup__input ${locationError ? "error" : ""}`}
            onBlur={() => validateField("location")}
            type="text"
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
          {locationError && (
            <p className="error-message">Location is required.</p>
          )}
          <div className="edit-popup__wrapper">
            <p className="edit-popup__subtitle">Morning</p>
            <textarea
              className={`edit-popup__input ${taskError ? "error" : ""}`}
              onBlur={() => validateField("task")}
              cols="25"
              rows="5"
              name="task"
              id="task"
              value={eventDetails.AMplan}
              onChange={(event) => {
                setEventDetails({
                  ...eventDetails,
                  AMplan: event.target.value,
                });
              }}
            ></textarea>
          </div>
          <div className="edit-popup__wrapper">
            <p className="edit-popup__subtitle">Afternoon</p>
            <textarea
              className={`edit-popup__input ${taskError ? "error" : ""}`}
              onBlur={() => validateField("task")}
              cols="25"
              rows="5"
              name="task"
              id="task"
              value={eventDetails.PMplan}
              onChange={(event) => {
                setEventDetails({
                  ...eventDetails,
                  PMplan: event.target.value,
                });
              }}
            ></textarea>
          </div>
          {taskError && <p className="error-message">Plan is required.</p>}

          <div className="edit-popup__wrapper">
            <p className="edit-popup__subtitle">Budget</p>
            <input
              className={`edit-popup__input ${budgetError ? "error" : ""}`}
              onBlur={() => validateField("budget")}
              type="text"
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
          </div>
          {budgetError && <p className="error-message">Budget is required.</p>}

          <button
            type="submit"
            className="edit-popup__button edit-popup__button--save"
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
