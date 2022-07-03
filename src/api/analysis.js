import axios from "axios";

async function getAnalysis() {
  const resp = await axios.post("http://tink.com:31695/analysis");
  return resp;
}

export { getAnalysis };
