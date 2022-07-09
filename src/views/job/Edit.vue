<template>
  <PageHeader></PageHeader>
  <a-form :model="formState" name="validate_other" v-bind="formItemLayout" @finishFailed="onFinishFailed"
    @finish="onFinish">

    <a-form-item label="任务类型" name="jobType" has-feedback :rules="[{ required: true, message: '请选择任务类型' }]">
      <a-select v-model:value="formState.jobType" placeholder="选择任务类型" :options="jobTypes">
      </a-select>
    </a-form-item>

    <a-form-item label="任务名称" name="Jobname" :rules="[{ required: true, message: '请输入唯一任务名称' }]">
      <a-input v-model:value="formState.Jobname" />
    </a-form-item>

    <a-form-item label="测试计划" name="jmx" has-feedback :rules="[{ required: true, message: '请选择一个测试计划' }]">
      <a-select v-model:value="formState.jmx" placeholder="选择脚本文件" :options="jmxFiles">
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">创建</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, onMounted, ref } from "vue";
import { getFiles } from "@/api/file";
import { createJob } from "@/api/job";
import PageHeader from '@/components/PageHeader.vue'


const jmxFiles = ref([]);
const jobTypes = ref([
  { label: 'Jmeter', value: 'Jmter' },
  { label: 'locust', value: 'locust' }
])

const getJmx = async () => {
  const td = [];
  const resp = await getFiles();

  console.log(resp.data.details);
  for (var i of resp.data.details) {
    const jmx = {};
    jmx.value = i;
    jmx.label = i;
    td.push(jmx);
  }
  jmxFiles.value = td;
};

export default defineComponent({
  name: "JobEdit",
  components: {
    PageHeader
  },

  setup() {
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const formState = reactive({});

    const onFinish = async (values) => {
      const resp = await createJob(values);
      console.log("Success:", resp);
      console.log("Success:", values);
      alert("Success");
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    onMounted(() => {
      getJmx();
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout,
      jmxFiles,
      jobTypes
    };
  },
});
</script>
