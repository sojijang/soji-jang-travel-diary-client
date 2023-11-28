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
import DeleteEvent from "../DeleteEvent/DeleteEvent";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function CalendarFeature({ currentUser }) {
  const [eventDetails, setEventDetails] = useState({});
  const [plans, setPlans] = useState([]);

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [morningTask, setMorningTask] = useState("");
  const [afternoonTask, setAfternoonTask] = useState("");
  const [budget, setBudget] = useState("");

  const [calendarActivities, setCalendarActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const [activityId, setActivityId] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openAddModal = () => {
    setIsAddOpen(true);
  };

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const openDetailModal = () => {
    setIsDetailOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setIsDetailOpen(false);
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setIsDetailOpen(false);
  };

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
    openDetailModal();
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
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
    closeAddModal();
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
    <section className="calendar">
      <article className="calendar-feature">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          events={plans}
        />
      </article>
      <button className="calendar-feature__button" onClick={openAddModal}>
        Add
      </button>
      <article className="add-popup">
        <AddEvent
          startDate={startDate}
          handleDateSelect={handleDateSelect}
          setLocation={setLocation}
          setMorningTask={setMorningTask}
          setAfternoonTask={setAfternoonTask}
          setBudget={setBudget}
          handleSubmit={handleSubmit}
          isAddOpen={isAddOpen}
          closeAddModal={closeAddModal}
        />
      </article>
      <article className="detail-popup">
        <EventDetails
          eventDetails={eventDetails}
          isDetailOpen={isDetailOpen}
          openEditModal={openEditModal}
          closeDetailModal={closeDetailModal}
          openDeleteModal={openDeleteModal}
          closeEditModal={closeEditModal}
        />
      </article>
      <article className="delete-popup">
        <DeleteEvent
          handleDelete={handleDelete}
          activityId={activityId}
          isDeleteOpen={isDeleteOpen}
          closeDeleteModal={closeDeleteModal}
        />
      </article>
      <article className="edit-popup">
        <EditEvent
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          handleSave={handleSave}
          isEditOpen={isEditOpen}
          closeEditModal={closeEditModal}
        />
      </article>
    </section>
  );
}
