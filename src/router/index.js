import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/Dashbord",
    name: "DashBord",
    meta: {
      path: "/",
      title: "仪表盘",
      subTitle: "信息的汇总展示",
      breadcrumbName: "仪表盘",
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
      breadcrumbName: "关于我",
    },
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/jmx/edit",
    name: "JmxEdit",
    meta: {
      path: "/",
      title: "测试计划",
      subTitle: "创建、编辑测试计划",
      breadcrumbName: "测试计划 / 创建",
    },
    component: () => import("@/views/jmx/Edit.vue"),
  },
  {
    path: "/jmx/table",
    name: "JmxTable",
    meta: {
      path: "/",
      title: "计划列表",
      subTitle: "测试计划列表",
      breadcrumbName: "测试计划 / 列表",
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
      breadcrumbName: "测试任务 / 创建",
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
      breadcrumbName: "测试任务 / 列表",
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
      breadcrumbName: "指标",
    },
    component: () => import("@/views/metric/List.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
