import axios from "axios";

var url;

if (process.env.NODE_ENV == "development") {
  url = "/api";
}

export const requestInstance = axios.create({
  baseURL: url,
});
