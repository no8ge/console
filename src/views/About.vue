<template>
  <PageHeader></PageHeader>
  <p>Testing in kubernetes, make testing is easy</p>
  <p>Distributed performance testing platform based on K8s</p>
  <h2 id="architecture">architecture</h2>
  <p><img src="../assets/architecture.svg" alt="img.png" /></p>
  <h2 id="deploy">deploy</h2>
  <h3 id="required">required</h3>
  <ul>
    <li>
      <a href="https://zh.wikipedia.org/zh-hans/Kubernetes">Kubernetes</a>
    </li>
    <li><a href="https://www.kubernetes.org.cn/installkubectl">kubectl</a></li>
    <li><a href="https://helm.sh/zh/docs/intro/install/">helm</a></li>
  </ul>
  <p>
    Make sure
    <a href="https://kubernetes.io/zh/docs/concepts/configuration/organize-cluster-access-kubeconfig">kubeconfig</a>
    is configured correctly
  </p>
  <pre><code class="lang-bash">helm repo add tink https://ante-involutum.github.io/chartrepo/
helm repo <span class="hljs-keyword">update</span> tink
helm <span class="hljs-keyword">install</span> middleware tink/middleware
helm <span class="hljs-keyword">install</span> files tink/files
helm <span class="hljs-keyword">install</span> tink tink/tink
helm <span class="hljs-keyword">install</span> analysis tink/analysis
</code></pre>
  <h2 id="ref">REF</h2>
  <ul>
    <li>
      <a href="https://jmeter.apache.org/usermanual/realtime-results.html#metrics">Metrics exposed</a>
    </li>
    <li>
      <a href="https://jmeter.apache.org/usermanual/realtime-results.html#influxdb_v2">InfluxBd Listener for
        Jmeter</a>
    </li>
  </ul>
</template>

<script>

import PageHeader from '@/components/PageHeader.vue'

export default {
  name: "AboutMe",
  components: {
    PageHeader
  }
};
</script>

<style scoped>
p {
  font-size: medium;
}
</style>
