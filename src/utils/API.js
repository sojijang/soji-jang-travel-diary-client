import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const fetchCurrentCurrency = async () => {
  const { data } = await axios.get(`${baseURL}/currency-rate`);
  return data;
};

const fetchCalendarActivity = async () => {
  const { data } = await axios.get(`${baseURL}/calendar-activity`);
  return data;
};

const fetchOneActivity = async (activityId) => {
  const { data } = await axios.get(
    `${baseURL}/calendar-activity/${activityId}`
  );
  return data;
};

const editActivity = async (activityId, editActivityObj) => {
  const response = await axios.put(
    `${baseURL}/calendar-activity/${activityId}`,
    editActivityObj
  );

  return response;
};

const deleteActivity = async (activityId) => {
  await axios.delete(`${baseURL}/calendar-activity/${activityId}`);
};

export {
  fetchCurrentCurrency,
  fetchCalendarActivity,
  fetchOneActivity,
  editActivity,
  deleteActivity,
};
