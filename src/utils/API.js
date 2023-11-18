import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const fetchCurrentCurrency = async () => {
  const { data } = await axios.get(`${baseURL}/currency-rate`);
  console.log(data);
  return data;
};

export { fetchCurrentCurrency };
