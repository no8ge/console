import axios from "axios";

var url;

if (process.env.NODE_ENV == "development") {
  url = "/api";
} else {
  url = "http://" + process.env.HOST + process.env.PORT;
}

export const requestInstance = axios.create({
  baseURL: url,
});
