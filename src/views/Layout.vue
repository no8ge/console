<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img alt="Tink logo" src="../assets/gundam.webp" height="100" width="200">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <fund-outlined />
          <span>仪表板</span>
          <router-link to="/dashbord"></router-link>
        </a-menu-item>

        <!-- <a-sub-menu key="sub1">
          <template #title>
            <span>
              <schedule-outlined />
              <span>构建测试</span>
            </span>
          </template>
          <a-menu-item key="3">
            <router-link to="/plan/edit"> 创建 </router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/plan/table"> 列表 </router-link>
          </a-menu-item>
        </a-sub-menu> -->

        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <project-outlined />
              <span>执行测试</span>
            </span>
          </template>
          <a-menu-item key="2">
            <router-link to="/job/edit"> 创建 </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/job/table"> 列表 </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="4">
          <fund-view-outlined />
          <span>测试报告</span>
          <router-link to="/metric"></router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <info-circle-outlined />
          <span>帮助</span>
          <router-link to="/help" msg="Welcome to Atop App"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div id="nav">
        </div>
        <router-view />

      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Atop ©2022 Created By lunz1207
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { FundOutlined, ProjectOutlined, InfoCircleOutlined, FundViewOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'BaseLayout',
  components: {
    FundOutlined,
    // ScheduleOutlined,
    ProjectOutlined,
    InfoCircleOutlined,
    FundViewOutlined
  },

  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  }
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>