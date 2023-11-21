import "./CalendarFeature.scss";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  fetchCalendarActivity,
  postActivity,
  editActivity,
  deleteActivity,
} from "../../utils/API";
import EventDetails from "../EventDetails/EventDetails";
import AddEvent from "../AddEvent/AddEvent";
import EditEvent from "../EditEvent/EditEvent";

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

  const [showEditEvent, setShowEditEvent] = useState(false);
  const [calendarActivities, setCalendarActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState(new Date());

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

  const handleEventClick = (clickInfo) => {
    setEventDetails({
      title: clickInfo.event.title,
      start: clickInfo.event.start.toLocaleString(),
      AMplan: clickInfo.event.extendedProps.AMplan,
      PMplan: clickInfo.event.extendedProps.PMplan,
      budget: clickInfo.event.extendedProps.budget,
    });

    setShowEvent(true);
    setShowEditEvent(false);
    setShowAddActivity(false);
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
    setDate(date.toISOString().split("T")[0]);
  };

  const handleAddClick = () => {
    setShowAddActivity(true);
    setShowEvent(false);
    setShowEditEvent(false);
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
    setShowAddActivity(false);
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
    <main className="calendar">
      <section className="calendar-feature">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          events={plans}
        />
      </section>
      <button className="calendar-feature__button" onClick={handleAddClick}>
        Add
      </button>
      {showEvent && (
        <EventDetails
          eventDetails={eventDetails}
          setShowEvent={setShowEvent}
          handleShowEdit={handleShowEdit}
        />
      )}
      {showEditEvent && (
        <EditEvent
          handleDateSelect={handleDateSelect}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
      )}
      {showAddActivity && (
        <AddEvent
          setShowAddActivity={setShowAddActivity}
          handleDateSelect={handleDateSelect}
          setLocation={setLocation}
          setMorningTask={setMorningTask}
          setAfternoonTask={setAfternoonTask}
          setBudget={setBudget}
          handleSubmit={handleSubmit}
        />
      )}
    </main>
  );
}
