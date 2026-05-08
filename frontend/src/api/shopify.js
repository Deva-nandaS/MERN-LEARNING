import axios from "axios";

const API_URL = "http://localhost:5000/api/shopify";

// CREATE
export const createSource = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// GET ALL
export const getSources = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// UPDATE
export const updateSource = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// DELETE
export const deleteSource = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};