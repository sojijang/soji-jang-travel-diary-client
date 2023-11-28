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
            className="edit-popup__input"
            value={eventDetails.start}
            onChange={handleDateSelect}
          />
          <p className="edit-popup__subtitle">Location:</p>
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
          <div className="edit-popup__wrapper">
            <p className="edit-popup__subtitle">Morning</p>
            <textarea
              cols="25"
              rows="5"
              className="edit-popup__input"
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
          <div className="edit-popup__wrapper">
            <p className="edit-popup__subtitle">Afternoon</p>
            <textarea
              cols="25"
              rows="5"
              className="edit-popup__input"
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
          <div className="edit-popup__wrapper">
            <p className="edit-popup__subtitle">Budget</p>
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
          </div>
          <button type="submit" className="edit-popup__button edit-popup__button--save">
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
