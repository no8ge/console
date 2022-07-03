<template>
  <a-list size="small" bordered :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>{{ item }}</a-list-item>
    </template>
  </a-list>
</template>
<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { getAnalysis } from "@/api/analysis";
var dayjs = require('dayjs')


const data = ref([]);
const timer = ref(null);

const getDate = async () => {
  const resp = await getAnalysis();
  resp.data.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  data.value.unshift(JSON.stringify(resp.data));
};

export default defineComponent({
  name: "metric-list",
  setup() {
    onMounted(() => {

      getDate();
      timer.value = setInterval(async () => {
        await getDate();
      }, 2000);
    });

    onUnmounted(() => {
      clearInterval(timer.value);
    });

    return {
      data,
    };
  },

  methods: {},
});
</script>
