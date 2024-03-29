import { requestInstance, env } from "./request";

export async function tink_task_status(name) {
  const resp = await requestInstance({
    method: "get",
    url: "api/v1/query",
    params: {
      query: `tink_task_status{namespace="${env.VUE_APP_namespace}",name="${name}"}`,
      // start: new Date(+new Date() + 8 * 3600 * 1000 - 120).toISOString(),
      // end: new Date(+new Date() + 8 * 3600 * 1000 + 120).toISOString(),
      // step:'10s'
    },
  });
  return resp;
}
