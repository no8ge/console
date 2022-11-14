<template>
  <PageHeader></PageHeader>
  <a-form :model="formState" name="validate_other" v-bind="formItemLayout" @finishFailed="onFinishFailed"
    @finish="onFinish">

    <a-form-item label="任务类型" name="type" has-feedback :rules="[{ required: true, message: '请选择任务类型' }]">
      <a-select v-model:value="formState.type" placeholder="选择任务类型" :options="types">
      </a-select>
    </a-form-item>

    <a-form-item label="任务名称" name="name" :rules="[{ required: true, message: '请输入唯一任务名称' }]">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item label="容器镜像" name="image" :rules="[{ required: true, message: '请输入容器镜像名称' }]">
      <a-input v-model:value="formState.image" />
    </a-form-item>

    <a-form-item label="启动命令" name="command" :rules="[{ required: true, message: '请输入容器启动命令' }]">
      <a-input v-model:value="formState.command" />
    </a-form-item>

    <a-form-item label="报告名称" name="prefix" :rules="[{ required: false, message: '请输入测试报告路径' }]">
      <a-input v-model:value="formState.prefix" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">创建</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import PageHeader from '@/components/PageHeader.vue'
import { v4 as uuidv4 } from 'uuid';
import { requestInstance } from '@/api/ooxx'
import { notification } from 'ant-design-vue';

const types = ref([
  { label: 'jmeter', value: 'jmter' },
  { label: 'locust', value: 'locust' },
  { label: 'aomaker', value: 'aomaker' }
])

const formState = ref({
  type: "jmeter",
  name: uuidv4().substr(0, 6),
  image: 'mx2542/demo:latest',
  command: 'apache-jmeter-5.4.3/bin/jmeter -n -t src/demo.jmx -l report/test.jtl -e -o report',
  prefix: '/demo/report'
});

const formItemLayout = ref({
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
});


export default defineComponent({
  name: "JobEdit",
  components: {
    PageHeader
  },

  setup() {
    const onFinish = async (values) => {
      await requestInstance({
        method: 'post',
        url: '/tink/job',
        data: {
          type: values.type,
          name: values.name,
          container: {
            image: values.image,
            command: values.command,
          },
          prefix: values.prefix
        }
      })
      notification.open({
        message: '创建成功',
        description: '任务创建成功',
        onClick: () => {
          console.log('Clicked!');
        },
      })
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    onMounted(() => {
    });
    return {
      onFinish,
      onFinishFailed,
      formItemLayout,
      types,
      formState
    };
  },
});
</script>
