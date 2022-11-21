import { requestInstance, env } from "./request";

export async function query(container, pod) {
  const resp = await requestInstance({
    method: "get",
    url: "api/v1/query",
    params: {
      query: `tink_task_status{container="${container}",namespace="${env.VUE_APP_namespace}",pod="${pod}"}`,
    },
  });
  return resp;
}
