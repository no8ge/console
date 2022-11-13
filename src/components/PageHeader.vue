<template>
  <!-- <a-page-header style="border: 1px solid rgb(235, 237, 240); background: #fff" v-bind:title="title"
    :breadcrumb="{ routes }" v-bind:sub-title="subTitle" /> -->
  <a-divider style="height: 2px; background-color: #7cb305" />
</template>
<script>
import router from "@/router";
import { defineComponent, ref } from "vue";

const title = ref();
const routes = ref();
const subTitle = ref();

export default defineComponent({
  setup() {
    const routeMeta = router.currentRoute.value.meta;
    routes.value = [
      {
        path: routeMeta.path,
        breadcrumbName: routeMeta.breadcrumbName,
      },
    ];

    title.value = routeMeta.title;
    subTitle.value = routeMeta.subTitle;

    return {
      routes,
      title,
      subTitle,
    };
  },
});
</script>
