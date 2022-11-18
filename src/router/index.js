import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", redirect: { name: "DashBord" } },
  {
    path: "/dashbord",
    name: "DashBord",
    component: () => import("@/views/Dashbord.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("@/views/Help.vue"),
  },
  {
    path: "/plan/edit",
    name: "PlanEdit",
    component: () => import("@/views/plan/Edit.vue"),
  },
  {
    path: "/plan/table",
    name: "PlanTable",
    component: () => import("@/views/plan/Table.vue"),
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
    path: "/metric",
    name: "Metric",
    component: () => import("@/views/metric/List.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
