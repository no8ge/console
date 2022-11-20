import axios from "axios";

var url;

const NODE_ENV = process.env.NODE_ENV;
const VUE_APP_host = process.env.VUE_APP_host;
const VUE_APP_port = process.env.VUE_APP_port;
const VUE_APP_namespace = process.env.VUE_APP_namespace;

if (NODE_ENV == "development") {
  url = "/apis";
} else {
  url = `http://${VUE_APP_host}:${VUE_APP_port}`;
}

export const requestInstance = axios.create({
  baseURL: url,
  headers: { Authorization: "admin" },
});

export const env = {
  NODE_ENV,
  VUE_APP_host,
  VUE_APP_port,
  VUE_APP_namespace,
};
