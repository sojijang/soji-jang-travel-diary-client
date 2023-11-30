import "./AddEvent.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function AddEvent({
  startDate,
  handleDateSelect,
  setLocation,
  setMorningTask,
  setAfternoonTask,
  setBudget,
  handleSubmit,
  isAddOpen,
  closeAddModal,
}) {
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
        break;

      default:
        break;
    }
  };

  return (
    <Modal
      isOpen={isAddOpen}
      onRequestClose={closeAddModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      className="add-popup__modal"
    >
      <div className="add-popup__wrapper">
        <button className="add-popup__button" onClick={closeAddModal}>
          Exit
        </button>
        <h2 className="add-popup__title">DAY PLAN</h2>
        <form className="add-popup__form" onSubmit={handleSubmit}>
          <p className="add-popup__subtitle">Date</p>
          <DatePicker
            className={`add-popup__input ${dateError ? "error" : ""}`}
            onBlur={() => validateField("date")}
            name="date"
            id="date"
            selected={startDate}
            onChange={handleDateSelect}
          />
          {dateError && <p className="error-message">Date is required.</p>}
          <p className="add-popup__subtitle">Location</p>
          <input
            type="text"
            name="location"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            className={`add-popup__input ${locationError ? "error" : ""}`}
            onBlur={() => validateField("location")}
          />
          {locationError && (
            <p className="error-message">Location is required.</p>
          )}

          <div className="add-popup__wrapper">
            <p className="add-popup__subtitle">Morning</p>
            <textarea
              name="task"
              id="task"
              cols="25"
              rows="5"
              onChange={(e) => setMorningTask(e.target.value)}
              className={`add-popup__input ${taskError ? "error" : ""}`}
              onBlur={() => validateField("task")}
            ></textarea>
            <p className="add-popup__subtitle">Afternoon</p>
            <textarea
              name="task"
              id="task"
              cols="25"
              rows="5"
              onChange={(e) => setAfternoonTask(e.target.value)}
              className={`add-popup__input ${taskError ? "error" : ""}`}
              onBlur={() => validateField("task")}
            ></textarea>
          </div>
          {taskError && <p className="error-message">Plan is required.</p>}
          <div>
            <p className="add-popup__subtitle">budget</p>
            <input
              type="text"
              name="budget"
              id="budget"
              onChange={(e) => setBudget(e.target.value)}
              className={`add-popup__input ${budgetError ? "error" : ""}`}
              onBlur={() => validateField("budget")}
            />
          </div>
          {budgetError && <p className="error-message">Budget is required.</p>}
          <button
            type="submit"
            className="add-popup__button add-popup__button--save"
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
