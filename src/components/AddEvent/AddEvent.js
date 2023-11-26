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
        <button className="calendar-feature__button" onClick={closeAddModal}>
          Exit
        </button>
        <h2>DAY PLAN</h2>
        <form onSubmit={handleSubmit}>
          <p>Date</p>
          <DatePicker selected={startDate} onChange={handleDateSelect} />
          <p>Location</p>
          <input type="text" onChange={(e) => setLocation(e.target.value)} />
          <div className="calendar-activity__plan-notes">
            <p>Morning</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Morning task"
              onChange={(e) => setMorningTask(e.target.value)}
            ></textarea>
            <p>Afternoon</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Afternoon task"
              onChange={(e) => setAfternoonTask(e.target.value)}
            ></textarea>
          </div>
          <br />
          <p>budget</p>
          <input type="text" onChange={(e) => setBudget(e.target.value)} />
          <br />
          <button type="submit" className="calendar-feature__button">
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
