import axios from "axios";

const AI_Server = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const database = axios.create({
  baseURL: "http://localhost:5000",
});

export { AI_Server, database };