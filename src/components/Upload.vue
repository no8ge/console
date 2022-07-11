<template>
  <a-form :model="formState" name="validate_other" v-bind="formItemLayout" @finishFailed="onFinishFailed"
    @finish="onFinish">
    <a-form-item label="计划类型">
      <span class="ant-form-text">Jmeter</span>
    </a-form-item>

    <a-form-item name='planName' label="计划名称">
      <a-input v-model:value="formState.planName" />
    </a-form-item>

    <a-form-item name="upload" label="测试文件">
      <a-upload v-model:fileList="formState.upload" name="file" :action="action" list-type="file">
        <a-button>
          <template #icon>
            <UploadOutlined />
          </template>
          上传
        </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">创建</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { createPlan } from '@/api/file'
export default defineComponent({
  name: 'UploadFile',
  components: {
    UploadOutlined
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
    const formState = reactive({
    });

    const onFinish = async values => {
      const payload = {
        plan_name: values.planName,
        attachment: []
      }
      for (var i of values.upload) {
        payload.attachment.push(i.response.details)
      }
      await createPlan(payload)
      console.log(payload)
      alert('done')
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout,
      action: "http://tink.com:31695/files/v2"
    };
  },

});
</script>