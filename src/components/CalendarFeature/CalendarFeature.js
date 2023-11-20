import "./CalendarFeature.scss";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";
import {
  fetchCalendarActivity,
  postActivity,
  editActivity,
  deleteActivity,
} from "../../utils/API";
import PlusSign from "../../assets/icons/plus-sign_3722458.png";

export default function CalendarFeature() {
  //   const { user_id: userId } = useParams();
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState("");
  const [plans, setPlans] = useState([]);

  const [date, setDate] = useState("");
  const [morningTask, setMorningTask] = useState("");
  const [afternoonTask, setAfternoonTask] = useState("");
  const [eveningTask, setEveningTask] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const fetchAllPlans = async () => {
      const allPlans = await fetchCalendarActivity();
      const formattedPlans = allPlans.map((plan) => ({
        title: plan.content,
        start: plan.date,
        budget: plan.budget,
        display: "background",
        classNames: "calendar-feature__button",
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
      if (!date || !morningTask || !afternoonTask || !eveningTask || !budget) {
        console.error("Please make sure all fields are filled out.");
        return;
      }

      const newActivity = {
        date: date,
        content: `${morningTask}\n${afternoonTask}\n${eveningTask}`,
        budget: parseFloat(budget),
      };

      const data = await postActivity(newActivity);

      console.log("Activity submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  const handleEventClick = (clickInfo) => {
    setEventDetails({
      title: clickInfo.event.title,
      start: clickInfo.event.start.toLocaleString(),
      budget: clickInfo.event.extendedProps.budget,
    });

    setShowEvent(true);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

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
        <div className="calendar-activity__wrapper">
          <button
            className="calendar-feature__button"
            onClick={() => setShowEvent(false)}
          >
            Exit
          </button>
          <h2>EVENT DETAILS</h2>
          <p>Date: {eventDetails.start}</p>
          <p>Plan: {eventDetails.title}</p>
          <p>Budget: {eventDetails.budget}</p>
          <button className="calendar-feature__button">Edit</button>
          <button className="calendar-feature__button">Delete</button>
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
            <input type="text" onChange={(e) => setDate(e.target.value)} />
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
            <p>Evening</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Evening task"
              onChange={(e) => setEveningTask(e.target.value)}
            ></textarea>
            <br />
            <p>budget</p>
            <input type="text" onChange={(e) => setBudget(e.target.value)} />
            <br />
            <button className="calendar-feature__button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
