<template>
  <PageHeader></PageHeader>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
       <a-form-item
        label="Test Plan"
        :name = 'samples.value'
        :rules="{
          required: true,
        }"
      >
        <a-input v-model:value="dynamicValidateForm.testPlan" />
      </a-form-item>

       <a-form-item
        label="Thread Group"

        :rules="{
          required: true
        }"
      >
        <a-input v-model:value="dynamicValidateForm.ThreadGroup" />
      </a-form-item>

    <a-space
      v-for="(sample, index) in dynamicValidateForm.samples"
      :key="sample.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >

       <a-form-item
        label="Name"
        :rules="{
          required: true
        }"
      >
        <a-input v-model:value="dynamicValidateForm.HTTPSamplerName" />
      </a-form-item>


       <a-form-item
        label="Domainr"
        :rules="{
          required: true
        }"
      >
        <a-input v-model:value="dynamicValidateForm.HTTPSamplerDomainr" />
      </a-form-item>


       <a-form-item
        label="Port"
        :rules="{
          required: true
        }"
      >
        <a-input v-model:value="dynamicValidateForm.HTTPSamplerPort" />
      </a-form-item>

       <a-form-item
        label="protocol"
        :rules="{
          required: true
        }"
      >
        <a-input v-model:value="dynamicValidateForm.HTTPSamplerProtocol" />
      </a-form-item>


       <a-form-item
        label="method"
        :rules="{
          required: true
        }"
      >
        <a-input v-model:value="dynamicValidateForm.HTTPSamplerMethod" />
      </a-form-item>

      <a-form-item
        :name="['samples', index]"
        label="Payload"
        :rules="{
          required: true,
        }"
      >
        <a-input v-model:value="dynamicValidateForm.HTTPSamplerPayload" />
      </a-form-item>


      <MinusCircleOutlined @click="removesample(sample)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addsample">
        <PlusOutlined />
        Add HTTP Sampler
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, watch } from 'vue';
import PageHeader from '@/components/PageHeader.vue'

export default defineComponent({
  name:'JmxEdit',
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    PageHeader
  },

  setup() {

    const samples = {
      Beijing: ['Tiananmen', 'Great Wall'],
      Shanghai: ['Oriental Pearl', 'The Bund'],
    };
    const formRef = ref();
    const dynamicValidateForm = reactive({
      samples: [],
    });
    watch(() => dynamicValidateForm.area, () => {
      dynamicValidateForm.samples = [];
    });

    const removesample = item => {
      let index = dynamicValidateForm.samples.indexOf(item);

      if (index !== -1) {
        dynamicValidateForm.samples.splice(index, 1);
      }
    };

    const addsample = () => {
      dynamicValidateForm.samples.push({
        value: undefined,
        price: undefined,
        id: Date.now(),
      });
    };

    const onFinish = values => {
      console.log('Received values of form:', values);
      console.log('dynamicValidateForm:', dynamicValidateForm);
    };

    return {
      formRef,
      dynamicValidateForm,
      onFinish,
      removesample,
      addsample,
      samples,
    };
  },

});
</script>