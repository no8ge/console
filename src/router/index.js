import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/Dashbord",
    name: "DashBord",
    meta: {
      path: "/",
      title: "仪表盘",
      subTitle: "信息的汇总展示",
      breadcrumbName: "dashbord",
    },
    component: () => import("@/views/Dashbord.vue"),
  },
  {
    path: "/",
    name: "About",
    meta: {
      path: "/",
      title: "关于我",
      subTitle: "系统架构设计以及部署方式",
      breadcrumbName: "about",
    },
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/jmx/edit",
    name: "JmxEdit",
    meta: {
      path: "/",
      title: "编辑脚本",
      subTitle: "创建测试脚本",
      breadcrumbName: "jmx/edit",
    },
    component: () => import("@/views/jmx/Edit.vue"),
  },
  {
    path: "/jmx/table",
    name: "JmxTable",
    meta: {
      path: "/",
      title: "脚本列表",
      subTitle: "测试脚本列表",
      breadcrumbName: "jmx/table",
    },
    component: () => import("@/views/jmx/Table.vue"),
  },
  {
    path: "/job/edit",
    name: "JobEdit",
    meta: {
      path: "/",
      title: "创建任务",
      subTitle: "创建测试任务",
      breadcrumbName: "job/edit",
    },
    component: () => import("@/views/job/Edit.vue"),
  },
  {
    path: "/job/table",
    name: "JobTable",
    meta: {
      path: "/",
      title: "任务列表",
      subTitle: "测试任务列表",
      breadcrumbName: "job/table",
    },
    component: () => import("@/views/job/Table.vue"),
  },
  {
    path: "/metric-list",
    name: "metric-list",
    meta: {
      path: "/",
      title: "指标",
      subTitle: "被测系统性能指标",
      breadcrumbName: "metric",
    },
    component: () => import("@/views/metric/List.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
