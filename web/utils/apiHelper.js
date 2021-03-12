import axios from 'axios';

export const getAuth = async (url, token) => {
  const response = await axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => err.response);

  return response.data;
};

export const postAuth = async (data, url, token) => {
  const response = await axios
    .post(url, data, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => err.response);

  return response.data;
};

export const post = async (data, url) => {
  const response = await axios.post(url, data).catch((err) => err.response);

  return response.data;
};

export const get = async (url) => {
  const response = await axios.get(url).catch((err) => err.response);

  return response.data;
};

export const patchAuth = async (data, url, token) => {
  const response = await axios
    .patch(url, data, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => err.response);

  return response.data;
};
