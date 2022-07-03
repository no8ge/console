<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    :action="action"
    :headers="headers"
    @change="handleChange"
  >
    <a-button type="primary">
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
  </a-upload>
</template>
<script>
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name:'JmxUpload',
  components: {
    UploadOutlined,
  },

  setup() {
    const handleChange = info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const fileList = ref([]);
    return {
      fileList,
      action:"http://tink.com:31695/files",
      headers: {
        authorization: 'authorization-text',
      },
      handleChange,
    };
  },

});
</script>