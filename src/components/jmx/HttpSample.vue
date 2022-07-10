<template>
  <a-space>
    <a-form-item v-for="item in items" :key="item" :label="item.lable" :rules="{
      required: true,
    }">
      <a-input v-model:value="httpSample[item.key]" />
    </a-form-item>
  </a-space>
  <a-button @click="sumit">summit</a-button>
</template>
<script>
import { defineComponent, ref } from "vue";

const httpSample = ref({});

export default defineComponent({
  name: "HttpSample",
  props: {
  },
  setup() {
    return {
      httpSample,
      items: [
        {
          lable: "请求名称",
          key: "name",
        },
        {
          lable: "地址",
          key: "url",
        },
        {
          lable: "端口",
          key: "port",
        },
        {
          lable: "协议",
          key: "protocol",
        },
        {
          lable: "方法",
          key: "method",
        },
        {
          lable: "请求体",
          key: "payload",
        },
      ],
    };
  },
  methods: {
    sumit() {
      console.log(httpSample.value);
    },
  },
});
</script>
