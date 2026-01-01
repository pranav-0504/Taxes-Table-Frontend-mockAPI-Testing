import axios from "axios";

// const BASE_URL = "https://685013d7e7c42cfd17974a33.mockapi.io";
const BASE_URL = "https://685013d7e7c42cfd17974a33.mockapi.io";

//! GET all taxes
export const getTaxes = async () => {
  const res = await axios.get(`${BASE_URL}/taxes`);
  return res.data;
};


//! UPDATE{PUT} a tax with {id} and {data}
export const updateTax = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/taxes/${id}`, data);
  return res.data;
};
