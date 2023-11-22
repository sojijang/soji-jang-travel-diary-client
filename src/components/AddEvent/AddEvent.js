import "./AddEvent.scss";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function AddEvent({
  setShowAddActivity,
  startDate,
  handleDateSelect,
  setLocation,
  setMorningTask,
  setAfternoonTask,
  setBudget,
  handleSubmit,
}) {
  return (
    <section className="calendar-activity">
      <div className="calendar-activity__wrapper">
        <button
          className="calendar-feature__button"
          onClick={() => setShowAddActivity(false)}
        >
          Exit
        </button>
        <h2>DAY PLAN</h2>
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
        <button className="calendar-feature__button" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </section>
  );
}
