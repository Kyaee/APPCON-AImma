import axios from "axios";

const AI_Server = axios.create({
  baseURL: "http://localhost:5000",
});

const database = axios.create({
  baseURL: "http://localhost:5000",
});

export { AI_Server, database };