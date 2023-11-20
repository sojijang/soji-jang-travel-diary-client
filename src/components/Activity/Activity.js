// import "./Activity.scss";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchCalendarActivity,
//   postActivity,
//   editActivity,
//   deleteActivity,
// } from "../../utils/API";

// export default function Activity({ onActivitySubmit }) {
//   const { activityId } = useParams();
//   const [morningTask, setMorningTask] = useState("");
//   const [afternoonTask, setAfternoonTask] = useState("");
//   const [eveningTask, setEveningTask] = useState("");
//   const [budget, setBudget] = useState("");
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       if (!morningTask || !afternoonTask || !eveningTask || !budget) {
//         console.error("Please make sure all fields are filled out.");
//         return;
//       }

//       const newActivity = {
//         content: `${morningTask}\n${afternoonTask}\n${eveningTask}`,
//         budget: parseFloat(budget),
//       };

//       const data = await postActivity(activityId, newActivity);

//       // Handle success or update UI as needed
//       console.log("Activity submitted successfully:", data);

//       // Update saveSuccess state if needed
//       setSaveSuccess(true);

//       // Call the provided callback function
//       if (onActivitySubmit) {
//         onActivitySubmit();
//       }
//     } catch (error) {
//       console.error("Error submitting activity:", error);
//       // Handle error or update UI as needed
//     }
//   };

//   useEffect(() => {
//     // You might want to fetch existing data for the activityId here
//   }, [activityId]);

//   return <>{/* Your JSX for rendering the activity form and UI */}</>;
// }
