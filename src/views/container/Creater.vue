<template>
    <a-form :model="formState" name="validate_other" v-bind="formItemLayout" @finishFailed="onFinishFailed"
      @finish="onFinish">
  
      <a-form-item label="任务类型" name="type" has-feedback :rules="[{ required: true, message: '请选择任务类型' }]">
        <a-input v-model:value="formState.type" />

      </a-form-item>
  
      <a-form-item label="任务名称" name="name" :rules="[{ required: true, message: '请输入唯一任务名称' }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>
  
      <a-form-item label="容器镜像" name="image" :rules="[{ required: true, message: '请输入容器镜像名称' }]">
        <a-input v-model:value="formState.image" />
      </a-form-item>
  
      <a-form-item label="项目名称" name="prefix" :rules="[{ required: false, message: '请输入项目名称' }]">
        <a-input v-model:value="formState.prefix" />
      </a-form-item>
  
      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-upload name='files' :customRequest='uploader' :showUploadList=false directory>
          <a-button>
            <upload-outlined></upload-outlined>
            上传测试文件
          </a-button>
        </a-upload>
      </a-form-item>
  
      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" html-type="submit">创建</a-button>
      </a-form-item>
    </a-form>
  </template>
  <script>
  import { defineComponent, onMounted, ref } from "vue";
  import { v4 as uuidv4 } from 'uuid';
  import { requestInstance } from '@/api/request'
  import { notification } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  
  
  const types = ref([
    { label: 'jmeter', value: 'jmter' },
    { label: 'locust', value: 'locust' },
    { label: 'aomaker', value: 'aomaker' },
    { label: 'konika', value: 'konika' }
  ])
  
  const formState = ref({
    type: "konika",
    name: uuidv4().substr(0, 6),
    image: 'dockerhub.qingcloud.com/qingtest/test:1.0',
    prefix: 'auth'
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
    name: "ContainerCreater",
    components: {
      UploadOutlined
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
              command: 'none',
            },
            prefix: values.prefix
          }
        })
        notification.open({
          message: '创建成功',
          onClick: () => {
            console.log('Clicked!');
          },
        })
      };
  
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
  
      const uploader = async (files) => {
        await requestInstance({
          method: 'post',
          url: '/files/upload/',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: { "files": files.file },
          params: {
            bucket_name: 'case'
          }
        })
        notification.open({
          message: '上传成功',
          onClick: () => {
            console.log('Clicked!');
          },
        })
      }
  
      onMounted(() => {
      });
      return {
        onFinish,
        onFinishFailed,
        formItemLayout,
        types,
        formState,
        uploader
      };
    },
  });
  </script>
  