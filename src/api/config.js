import axios from 'axios';

export default axios.create({
  // common base url is entere here
  baseURL: 'http://www.omdbapi.com',
  headers: {},
});
