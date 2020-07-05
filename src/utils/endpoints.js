const BASE_URL =
  'https://5f0242b39e41230016d42cb5.mockapi.io/brooklyn-studios/react-task';

const API_ENDPOINTS = {
  LIST: `${BASE_URL}/todos`,
  ADD: `${BASE_URL}/todos`,
  UPDATE: (id) => `${BASE_URL}/todos/${id}`,
  DELETE: (id) => `${BASE_URL}/todos/${id}`,
  FIND: (id) => `${BASE_URL}/todos/${id}`
};

export default API_ENDPOINTS;
