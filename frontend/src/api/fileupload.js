import axios from "axios";

const API_URL = "http://localhost:5000/api/files";

export const uploadFiles = async (files, uploadedBy = "dev") => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file.file || file);
  });

  formData.append("uploadedBy", uploadedBy);

  const token = localStorage.getItem("token"); 
  console.log("TOKEN:", localStorage.getItem("token"));

  const res = await axios.post(API_URL, formData, {
    headers: {
    
      Authorization: `Bearer ${token}`, 
    },
  });

  return res.data;
};

export const getFiles = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const deleteFiles = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
