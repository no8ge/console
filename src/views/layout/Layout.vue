<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img alt="Tink logo" src="../../assets/gundam.webp" height="100" width="200" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <fund-outlined />
          <span>总览</span>
          <router-link to="/dashbord"></router-link>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <schedule-outlined />
              <span>构建中心</span>
            </span>
          </template>
          <a-menu-item key="2">
            <router-link to="/container/creater"> 创建 </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/container/list"> 列表 </router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <project-outlined />
              <span>测试中心</span>
            </span>
          </template>
          <a-menu-item key="4">
            <router-link to="/task/creater"> 创建 </router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <router-link to="/task/list"> 列表 </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="6">
          <fund-view-outlined />
          <span>监控中心</span>
          <router-link to="/metric"></router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <info-circle-outlined />
          <span>帮助中心</span>
          <router-link to="/help" msg="Welcome to Atop App"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div id="nav">
          <a-page-header style="border: 10px solid white" :title="title" :sub-title="subtitle" />
          <a-divider />
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
import {
  FundOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
  ScheduleOutlined,
  FundViewOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

const title = ref([]);
const subtitle = ref([]);
const selectedKeys = ref([])

export default defineComponent({
  name: "BaseLayout",
  components: {
    FundOutlined,
    ScheduleOutlined,
    ProjectOutlined,
    InfoCircleOutlined,
    FundViewOutlined,
  },
  setup() {
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        title.value = route.meta.title;
        subtitle.value = route.meta.subtitle;
        selectedKeys.value = [route.meta.key]
      }
    );
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys,
      title,
      subtitle,
    };
  },
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

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
