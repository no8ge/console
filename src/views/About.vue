<template>
  <PageHeader></PageHeader>
  <p>云原生性能测试平台，让性能测试更加简单。</p>
  <h2 id="architecture">架构设计</h2>
  <p><img src="../assets/architecture.svg" alt="img.png" /></p>
  <h2 id="deploy">部署</h2>
  <p>平台通过 helm 即可便捷部署至 kubernetes 集群</p>
  <h3 id="required">依赖</h3>
  <ul>
    <li>
      <a href="https://zh.wikipedia.org/zh-hans/Kubernetes">Kubernetes</a>
    </li>
    <li><a href="https://www.kubernetes.org.cn/installkubectl">kubectl</a></li>
    <li><a href="https://helm.sh/zh/docs/intro/install/">helm</a></li>
    <li>
      <a href="https://kubernetes.io/zh/docs/concepts/configuration/organize-cluster-access-kubeconfig">kubeconfig</a>
    </li>
  </ul>
  <pre><code class="lang-bash">helm repo add tink https://ante-involutum.github.io/chartrepo/
helm repo <span class="hljs-keyword">update</span> tink
helm <span class="hljs-keyword">install</span> middleware tink/middleware
helm <span class="hljs-keyword">install</span> files tink/files
helm <span class="hljs-keyword">install</span> tink tink/tink
helm <span class="hljs-keyword">install</span> analysis tink/analysis
</code></pre>
  <h2 id="ref">相关链接</h2>
  <ul>
    <li>
      <a href="https://jmeter.apache.org/usermanual/realtime-results.html#metrics">Metrics exposed</a>
    </li>
    <li>
      <a href="https://jmeter.apache.org/usermanual/realtime-results.html#influxdb_v2">InfluxBd Listener for
        Jmeter</a>
    </li>
  </ul>
  <h2 id="deploy">to do</h2>
  <ul>
    <li>
      <p>jmx文件在线编辑、入库</p>
    </li>
    <li>
      <p>性能指标按照条件搜索</p>
    </li>
    <li>
      <p>测试任务参数化</p>
    </li>
    <li>
      <p>测试任务、计划搜索</p>
    </li>
    <li>
      <p>性能指标入库，分析</p>
    </li>
    <li>
      <p>账号、登录系统</p>
    </li>
    <li>
      <p>分布式测试任务</p>
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
