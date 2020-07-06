import axios from 'axios';

export const baseURL = 'http://192.168.3.109:3030';

export default axios.create({
  baseURL,
});
