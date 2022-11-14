import axios from "axios";

var url;

if (process.env.NODE_ENV == "development") {
  url = "/api";
} else {
  url = "http://" + process.env.VUE_APP_host + ":" + process.env.VUE_APP_port;
}

export const requestInstance = axios.create({
  baseURL: url,
  headers: { "Authorization": "admin" }
});
