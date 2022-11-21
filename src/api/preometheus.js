import { requestInstance, env } from "./request";

export async function tink_task_status() {
  const resp = await requestInstance({
    method: "get",
    url: "api/v1/query",
    params: {
      query: `tink_task_status{namespace="${env.VUE_APP_namespace}"}`,
    },
  });
  return resp;
}
