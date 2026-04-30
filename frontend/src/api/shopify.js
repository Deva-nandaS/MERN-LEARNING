import axios from "axios";

const API_URL = "http://localhost:5000/api/shopify";

// GET ALL
export const getSources = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// DELETE
export const deleteSource = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};