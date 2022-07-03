import axios from "axios";

async function createJob(obj) {
  const resp = await axios.post("http://tink.com:31695/tink/job", {
    name: obj.Jobname,
    jmx: `/jmx/${obj.jmx}`,
  });
  return resp;
}

async function getJob() {
  const resp = await axios.get("http://tink.com:31695/tink/jobs");
  return resp;
}

async function deleteJob(name) {
  const resp = await axios.delete(`http://tink.com:31695/tink/job/${name}`);
  return resp;
}

export { createJob, getJob, deleteJob };
