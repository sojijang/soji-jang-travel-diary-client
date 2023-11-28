import "./AddEvent.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";

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
  return (
    <Modal
      isOpen={isAddOpen}
      onRequestClose={closeAddModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="add-popup__wrapper">
        <button className="add-popup__button" onClick={closeAddModal}>
          Exit
        </button>
        <h2 className="add-popup__title">DAY PLAN</h2>
        <form className="add-popup__form" onSubmit={handleSubmit}>
          <p className="add-popup__subtitle">Date</p>
          <DatePicker
            className="add-popup__input"
            selected={startDate}
            onChange={handleDateSelect}
          />
          <p className="add-popup__subtitle">Location</p>
          <input
            className="add-popup__input"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="add-popup__wrapper">
            <p className="add-popup__subtitle">Morning</p>
            <textarea
              className="add-popup__input"
              name="text"
              id="text"
              cols="25"
              rows="5"
              onChange={(e) => setMorningTask(e.target.value)}
            ></textarea>
            <p className="add-popup__subtitle">Afternoon</p>
            <textarea
              className="add-popup__input"
              name="text"
              id="text"
              cols="25"
              rows="5"
              onChange={(e) => setAfternoonTask(e.target.value)}
            ></textarea>
          </div>
          <div>
            <p className="add-popup__subtitle">budget</p>
            <input
              className="add-popup__input"
              type="text"
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
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
