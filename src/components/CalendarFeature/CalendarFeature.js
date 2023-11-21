import "./CalendarFeature.scss";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchCalendarActivity,
  postActivity,
  editActivity,
  deleteActivity,
} from "../../utils/API";

export default function CalendarFeature() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState("");
  const [plans, setPlans] = useState([]);

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [morningTask, setMorningTask] = useState("");
  const [afternoonTask, setAfternoonTask] = useState("");
  const [budget, setBudget] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const [showEditEvent, setShowEditEvent] = useState(false);
  const [calendarActivities, setCalendarActivities] = useState(null);
  const [calendarId, setCalendarId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPlans = async () => {
      const allPlans = await fetchCalendarActivity();
      const formattedPlans = allPlans.map((plan) => ({
        title: plan.location,
        start: plan.date,
        AMplan: plan.morning_task,
        PMplan: plan.afternoon_task,
        budget: plan.budget,
        display: "background",
      }));
      setPlans(formattedPlans);
    };

    fetchAllPlans();
  }, []);

  const handleAddClick = () => {
    setShowAddActivity(true);
  };

  const handleSubmit = async () => {
    try {
      if (!date || !location || !morningTask || !afternoonTask || !budget) {
        console.error("Please make sure all fields are filled out.");
        return;
      }

      const newActivity = {
        date: date,
        location: location,
        morning_task: morningTask,
        afternoon_task: afternoonTask,
        budget: parseFloat(budget),
      };

      const data = await postActivity(newActivity);

      console.log("Activity submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
    setDate(date.toISOString().split("T")[0]);
  };

  const handleEventClick = (clickInfo) => {
    setEventDetails({
      title: clickInfo.event.title,
      start: clickInfo.event.start.toLocaleString(),
      AMplan: clickInfo.event.extendedProps.AMplan,
      PMplan: clickInfo.event.extendedProps.PMplan,
      budget: clickInfo.event.extendedProps.budget,
    });

    setShowEvent(true);
  };

  const getCalendarActivity = async () => {
    try {
      const data = await fetchCalendarActivity();
      setCalendarActivities(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCalendarActivity();
  }, []);

  const handleShowEdit = () => {
    setShowEvent(false);
    setShowEditEvent(true);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="calendar-feature">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        events={plans}
      />
      <button className="calendar-feature__button" onClick={handleAddClick}>
        Add
      </button>
      {showEvent && (
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
          <div className="calendar-activity__time">
            <p>AM</p>
            <p>PM</p>
          </div>
          <div className="calendar-activity__plan-notes">
            <p> {eventDetails.AMplan}</p>
            <div className="calendar-activity__time-table">
              <p>12</p>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
            </div>
            <p> {eventDetails.PMplan}</p>
          </div>
          <p>Budget: {eventDetails.budget}</p>
          <button className="calendar-feature__button" onClick={handleShowEdit}>
            Edit
          </button>
          <button className="calendar-feature__button">Delete</button>
        </div>
      )}
      {showEditEvent && (
        <div className="edit-popup">
          <h2 className="edit-popup__title">Edit Event</h2>
          <form className="edit-popup__form">
            <p className="edit-popup__subtitle">Date</p>
            <DatePicker selected={startDate} onChange={handleDateSelect} />
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
            <button type="submit">Save</button>
            <button>Cancel</button>
          </form>
        </div>
      )}
      {showAddActivity && (
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
            <div className="calendar-activity__time">
              <p>AM</p>
              <p>PM</p>
            </div>
            <div className="calendar-activity__plan-notes">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Morning task"
                onChange={(e) => setMorningTask(e.target.value)}
              ></textarea>
              <div className="calendar-activity__time-table">
                <p>12</p>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
              </div>
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
      )}
    </main>
  );
}
