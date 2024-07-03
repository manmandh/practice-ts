import axios from "axios";

// const host = 'https://json-server-0tdv.onrender.com/';
const host = "http://localhost:3021";

export default axios.create({
  baseURL: host,
});
