import axios from "axios";

const BASE_URL = "https://685013d7e7c42cfd17974a33.mockapi.io";

export const getCountries = async () => {
  const res = await axios.get(`${BASE_URL}/countries`);
  return res.data;

};
