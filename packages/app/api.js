import axios from 'axios';

export const baseURL = 'https://jvtrufas.henriquecouto.com.br';

export default axios.create({
  baseURL,
});
