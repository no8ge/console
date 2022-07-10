<template>
  <a-form-item label="线程组" :rules="{
    required: true,
  }">
    <!-- <a-input v-model:value="httpSample['testPlan']" /> -->
  </a-form-item>

  <HttpSample></HttpSample>
</template>
<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import HttpSample from "@/components/jmx/HttpSample.vue";

const httpSample = ref({});

export default defineComponent({
  name: "ThreadGroup",
  components: {
    HttpSample,
  },
  props: {},
  setup() {
    const a = getCurrentInstance()

    console.log(a)
    return {
      httpSample,
    };
  },

  methods: {
    sumit() {
      console.log(httpSample.value);
    },
  },
});
</script>
