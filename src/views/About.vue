<template>
  <PageHeader></PageHeader>
  <p>atop, Automated test open platform, 自动化测试开放平台</p>
  <h2 id="deploy">部署</h2>
  <p>平台通过 helm 即可便捷部署至 kubernetes 集群</p>
  <h3 id="required">依赖</h3>
  <ul>
    <li>
      <a href="https://zh.wikipedia.org/zh-hans/Kubernetes">Kubernetes</a>
    </li>
    <li><a href="https://helm.sh/zh/docs/intro/install/">helm</a></li>
  </ul>
  <pre>
  <code class="lang-bash">helm repo add atop https://no8ge.github.io/chartrepo/
  helm repo <span class="hljs-keyword">update</span> atop
  helm <span class="hljs-keyword">install</span> atop atop/atop -n <span class="hljs-keyword">you-namespace</span>
</code>

</pre>
  <h2 id="deploy">功能</h2>
  <ul>
    <li>
      <p>支持 jmeter</p>
    </li>
    <li>
      <p>支持 locust</p>
    </li>
  </ul>

  <h2 id="deploy">使用方式</h2>
  <ul>
    <p>1. 确保你的测试可以在容器中正常运行</p>
    <p>2. 在执行测试 - 创建中创建测试任务</p>
  </ul>
  <h2 id="ref">相关链接</h2>
  <ul>
    <li>
      <a href="https://github.com/no8ge">Github</a>
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
