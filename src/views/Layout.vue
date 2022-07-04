<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img alt="Vue logo" src="../assets/heart.jpg" height="100" width="200">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <router-link to="/" msg="Welcome to Tink App"> About </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <router-link to="/Dashbord"> Dashbord </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>Jmx</span>
            </span>
          </template>
          <a-menu-item key="3">
            <router-link to="/jmx/edit"> Edit </router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/jmx/table"> List </router-link>
          </a-menu-item>

        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Job</span>
            </span>
          </template>
          <a-menu-item key="5">
            <router-link to="/job/edit"> Create </router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <router-link to="/job/table"> List </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="7">
          <file-outlined />
            <router-link to="/metric-list"> Metric </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
        <PageHeader></PageHeader>
      <a-layout-content style="margin: 0 16px">
        <div id="nav">
        </div>
        <router-view />

      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Tink ©2022 Created By lunz1207
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import PageHeader from '../components/PageHeader.vue'

export default defineComponent({
  name: 'BaseLayout',
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    PageHeader
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