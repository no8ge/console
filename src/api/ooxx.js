import axios from "axios";

var url;

if (process.env.NODE_ENV == "development") {
  url = "/api";
} else {
  url = "http://" + process.env.host + process.env.port;
}

export const requestInstance = axios.create({
  baseURL: url,
});
