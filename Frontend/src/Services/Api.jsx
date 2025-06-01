import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

export const get = async (endpoint) => {
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`);
    return res.data;
  } catch (err) {
    console.log('GET Error:', err.message);
  }
};

export const post = async (endpoint, data) => {
  try {
    const res = await axios.post(`${BASE_URL}${endpoint}`, data);
    return res.data;
  } catch (err) {
    console.log('POST Error:', err.message);
  }
};

export const put = async (endpoint, data) => {
  try {
    const res = await axios.put(`${BASE_URL}${endpoint}`, data);
    return res.data;
  } catch (err) {
    console.log('PUT Error:', err.message);
  }
};
