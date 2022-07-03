<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"

    :breadcrumb="{ routes }"

  />
</template>
<script>
import { defineComponent } from "vue";
const routes = [
  {
    path: "/about",
    breadcrumbName: "Tink",
  }
];
export default defineComponent({
  name: "PageHeader",
  setup() {
    return {
      routes,
    };
  },
});
</script>
