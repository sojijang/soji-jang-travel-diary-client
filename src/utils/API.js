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

const fetchOneCalendarActivity = async (calendarId) => {
  const { data } = await axios.get(
    `${baseURL}/calendar-activity/${calendarId}`
  );
  return data;
};

const postActivity = async (newActivity) => {
  const { data } = await axios.post(`${baseURL}/calendar-activity`, {
    ...newActivity,
  });
  return data;
};

const editActivity = async (calendarId, editEventObj) => {
  const response = await axios.put(
    `${baseURL}/calendar-activity/${calendarId}`,
    editEventObj
  );

  return response;
};

const deleteActivity = async (calendarId) => {
  await axios.delete(`${baseURL}/calendar-activity/${calendarId}`);
};

export {
  fetchCurrentCurrency,
  fetchCalendarActivity,
  fetchOneCalendarActivity,
  postActivity,
  editActivity,
  deleteActivity,
};
