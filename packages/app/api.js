import axios from 'axios';

// export const baseURL = 'https://jvtrufas.henriquecouto.com.br';
export const baseURL = 'http://192.168.3.105:3030';

export default axios.create({
  baseURL,
});
