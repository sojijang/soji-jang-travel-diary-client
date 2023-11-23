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

const fetchOneCalendarActivity = async (activityId) => {
  const { data } = await axios.get(
    `${baseURL}/calendar-activity/${activityId}`
  );
  return data;
};

const postActivity = async (newActivity) => {
  const { data } = await axios.post(`${baseURL}/calendar-activity`, {
    ...newActivity,
  });
  return data;
};

const editActivity = async (activityId, updatedActivity) => {
  const response = await axios.put(
    `${baseURL}/calendar-activity/${activityId}`,
    updatedActivity
  );

  return response;
};

const deleteActivity = async (activityId) => {
  await axios.delete(`${baseURL}/calendar-activity/${activityId}`);
};

const fetchMapPoint = async () => {
  const { data } = await axios.get(`${baseURL}/map`);
  return data;
};

const fetchOneMapPoint = async (map_pointId) => {
  const { data } = await axios.get(`${baseURL}/map/${map_pointId}`);
  return data;
};

const postMapPoint = async (newMapPoint) => {
  const { data } = await axios.post(`${baseURL}/map`, {
    ...newMapPoint,
  });
  return data;
};

const editMapPoint = async (map_pointId, updatedMapPoint) => {
  const response = await axios.put(
    `${baseURL}/map/${map_pointId}`,
    updatedMapPoint
  );

  return response;
};

const deleteMapPoint = async (map_pointId) => {
  await axios.delete(`${baseURL}/map/${map_pointId}`);
};

export {
  fetchCurrentCurrency,
  fetchCalendarActivity,
  fetchOneCalendarActivity,
  postActivity,
  editActivity,
  deleteActivity,
  fetchMapPoint,
  fetchOneMapPoint,
  postMapPoint,
  editMapPoint,
  deleteMapPoint,
};
