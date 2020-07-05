import axios from 'axios';
import API_ENDPOINTS from './endpoints';

const API = {};

API.listUsers = () => axios.get(API_ENDPOINTS.LIST);
API.addUser = (name) => axios.post(API_ENDPOINTS.ADD, { name });
API.editUser = (id, name) => axios.put(API_ENDPOINTS.UPDATE(id), { name });
API.removeUser = (id) => axios.delete(API_ENDPOINTS.DELETE(id));
API.searchUser = (id) => axios.get(API_ENDPOINTS.FIND(id));

export default API;
