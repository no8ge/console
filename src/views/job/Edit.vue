<template>
  <a-form :model="formState" name="validate_other" v-bind="formItemLayout" @finishFailed="onFinishFailed"
    @finish="onFinish">
    <a-form-item label="Tpye">
      <span class="ant-form-text">Job</span>
    </a-form-item>

    <a-form-item label="Job name" name="Jobname" :rules="[{ required: true, message: 'Please input your job name!' }]">
      <a-input v-model:value="formState.Jobname" />
    </a-form-item>

    <a-form-item label="Select jmx" name="jmx" has-feedback
      :rules="[{ required: true, message: 'Please select your jmx!' }]">
      <a-select v-model:value="formState.jmx" placeholder="Please select a jmx" :options="jmxFiles">
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">Create</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, onMounted, ref } from "vue";
import { getFiles } from "@/api/file";
import { createJob } from "@/api/job";

const jmxFiles = ref([]);

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
  components: {},

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
      jmxFiles
    };
  },
});
</script>
