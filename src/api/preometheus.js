import { requestInstance, env } from "./request";

export async function query(container, pod) {
  const resp = await requestInstance({
    method: "get",
    url: "api/v1/query",
    params: {
      query: `kube_pod_container_status_running{container="${container}",namespace="${env.VUE_APP_namespace}",pod="${pod}"} - kube_pod_container_status_terminated{container="${container}",namespace="${env.VUE_APP_namespace}",pod="${pod}"}`,
    },
  });
  return resp;
}
