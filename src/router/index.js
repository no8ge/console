import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: { name: "DashBord" },
  },
  {
    path: "/login",
    name: "LoggIn",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    meta: { title: "总览", subtitle: "查看平台整体状态", key: "1" },
    path: "/dashbord",
    name: "DashBord",
    component: () => import("@/views/dashbord/Dashbord.vue"),
  },
  {
    meta: { title: "构建中心", subtitle: "将测试脚本构建为容器镜像", key: "2" },
    path: "/container/creater",
    name: "ContainerCreater",
    component: () => import("@/views/container/Creater.vue"),
  },
  {
    meta: { title: "构建中心", subtitle: "查看构建状态", key: "3" },
    path: "/container/list",
    name: "ContainerList",
    component: () => import("@/views/container/List.vue"),
  },
  {
    meta: { title: "测试中心", subtitle: "使用镜像新建测试活动", key: "4" },
    path: "/task/creater",
    name: "TaskCreater",
    component: () => import("@/views/task/Creater.vue"),
  },
  {
    meta: { title: "测试中心", subtitle: "查看测试活动状态", key: "5" },
    path: "/task/list",
    name: "TaskList",
    component: () => import("@/views/task/List.vue"),
  },
  {
    meta: { title: "数据中心", subtitle: "查看测试数据", key: "6" },
    path: "/metric",
    name: "Metric",
    component: () => import("@/views/metric/List.vue"),
  },
  {
    meta: { title: "帮助中心", subtitle: "查看帮助文档", key: "7" },
    path: "/help",
    name: "Help",
    component: () => import("@/views/help/Help.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
