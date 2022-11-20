<template>
  <a-card title="测试数据" style="width: 1000px">
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
  <br />

  <a-card title="平台数据" style="width: 1000px">
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>

</template>
<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";



const data = ref([]);
const timer = ref(null);

export default defineComponent({
  name: "MetricList",
  components:{
  },
  setup() {
    onMounted(() => {

      timer.value = setInterval(async () => {
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
