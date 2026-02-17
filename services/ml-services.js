import axios from "axios";
import FormData from "form-data";

const ML_URL = process.env.ML_URI || "http://127.0.0.1:8000/predict";

const analyze = async (buffer, originalName) => {
  const formData = new FormData();
  formData.append("file", buffer, originalName);

  const response = await axios.post(ML_URL, formData, {
    headers: formData.getHeaders(),
    timeout: 120000
  });

  return response.data;
};

export default analyze;
