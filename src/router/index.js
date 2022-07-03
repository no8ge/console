import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/Dashbord",
    name: "DashBord",
    component: () => import("@/views/Dashbord.vue"),
  },
  {
    path: "/",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/jmx/edit",
    name: "JmxEdit",
    component: () => import("@/views/jmx/Edit.vue"),
  },
  {
    path: "/jmx/table",
    name: "JmxTable",
    component: () => import("@/views/jmx/Table.vue"),
  },
  {
    path: "/job/edit",
    name: "JobEdit",
    component: () => import("@/views/job/Edit.vue"),
  },
  {
    path: "/job/table",
    name: "JobTable",
    component: () => import("@/views/job/Table.vue"),
  },
  {
    path: "/metric-list",
    name: "metric-list",
    component: () => import("@/views/metric/List.vue"),
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
