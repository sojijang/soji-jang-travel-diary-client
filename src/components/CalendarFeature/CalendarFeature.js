import "./CalendarFeature.scss";
import { useState, useEffect, useRef } from "react";
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
import DeleteEvent from "../DeleteEvent/DeleteEvent";

export default function CalendarFeature({ currentUser }) {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [plans, setPlans] = useState([]);

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [morningTask, setMorningTask] = useState("");
  const [afternoonTask, setAfternoonTask] = useState("");
  const [budget, setBudget] = useState("");

  const [showEditEvent, setShowEditEvent] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [calendarActivities, setCalendarActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const [activityId, setActivityId] = useState(null);

  useEffect(() => {
    const fetchAllPlans = async () => {
      const allPlans = await fetchCalendarActivity();
      const formattedPlans = allPlans.map((plan) => ({
        id: plan.id,
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
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start.toISOString().split("T")[0],
      AMplan: clickInfo.event.extendedProps.AMplan,
      PMplan: clickInfo.event.extendedProps.PMplan,
      budget: clickInfo.event.extendedProps.budget,
    });

    setActivityId(clickInfo.event.id);

    setShowEvent(true);
    setShowEditEvent(false);
    setShowAddActivity(false);
    setShowEditDelete(false);
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
    setDate(date.toISOString().split("T")[0]);
  };

  // check here
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!date || !location || !morningTask || !afternoonTask || !budget) {
        console.error("Please make sure all fields are filled out.");
        return;
      }

      const newActivity = {
        user_id: currentUser,
        date: date,
        location: location,
        morning_task: morningTask,
        afternoon_task: afternoonTask,
        budget: parseFloat(budget),
      };

      const data = await postActivity(newActivity);

      console.log("Activity submitted successfully:", data);

      setPlans([
        ...plans,
        {
          id: data.id,
          title: data.location,
          start: data.date,
          AMplan: data.morning_task,
          PMplan: data.afternoon_task,
          budget: data.budget,
          display: "background",
        },
      ]);
      setShowAddActivity(false);
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const updatedActivity = {
      user_id: currentUser,
      date: eventDetails.start,
      location: eventDetails.title,
      morning_task: eventDetails.AMplan,
      afternoon_task: eventDetails.PMplan,
      budget: parseFloat(eventDetails.budget),
    };

    try {
      await editActivity(activityId, updatedActivity);

      setPlans(
        plans.map((plan) =>
          plan.id === activityId
            ? {
                ...plan,
                title: updatedActivity.location,
                start: updatedActivity.date,
                AMplan: updatedActivity.morning_task,
                PMplan: updatedActivity.afternoon_task,
                budget: updatedActivity.budget,
              }
            : plan
        )
      );
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await deleteActivity(activityId);

      setPlans(plans.filter((plan) => plan.id !== activityId));
    } catch (error) {
      console.error(error);
    }

    setShowEditDelete(false);
  };

  const handleAddClick = () => {
    setShowAddActivity(true);
    setShowEvent(false);
    setShowEditEvent(false);
    setShowEditDelete(false);
  };

  const handleShowEdit = () => {
    setShowEditEvent(true);
    setShowEvent(false);
    setShowAddActivity(false);
    setShowEditDelete(false);
  };

  const handleShowDelete = () => {
    setShowEditDelete(true);
    setShowEvent(false);
    setShowEditEvent(false);
    setShowAddActivity(false);
  };

  //styling
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <div style={{ color: "red" }}>
          <i>{eventInfo.event.title}</i>
        </div>
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
          handleShowDelete={handleShowDelete}
        />
      )}
      {showEditDelete && (
        <DeleteEvent handleDelete={handleDelete} activityId={activityId} />
      )}
      {showEditEvent && (
        <EditEvent
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          handleSave={handleSave}
        />
      )}
      {showAddActivity && (
        <AddEvent
          setShowAddActivity={setShowAddActivity}
          startDate={startDate}
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
