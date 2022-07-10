<template>
  <PageHeader></PageHeader>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" force-render="false" tab="在线编辑">
      <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">
        <a-form-item label="测试计划" :name="samples.value" :rules="{
          required: true,
        }">
          <a-input v-model:value="dynamicValidateForm.testPlan" />
        </a-form-item>

        <a-form-item label="线程组" :rules="{
          required: true,
        }">
          <a-input v-model:value="dynamicValidateForm.ThreadGroup" />
        </a-form-item>

        <a-space v-for="(sample, index) in dynamicValidateForm.samples" :key="sample.id"
          style="display: flex; margin-bottom: 8px" align="baseline">
          <a-form-item label="请求名称" :rules="{
            required: true,
          }">
            <a-input v-model:value="dynamicValidateForm.HTTPSamplerName" />
          </a-form-item>

          <a-form-item label="地址" :rules="{
            required: true,
          }">
            <a-input v-model:value="dynamicValidateForm.HTTPSamplerDomainr" />
          </a-form-item>

          <a-form-item label="端口" :rules="{
            required: true,
          }">
            <a-input v-model:value="dynamicValidateForm.HTTPSamplerPort" />
          </a-form-item>

          <a-form-item label="协议" :rules="{
            required: true,
          }">
            <a-input v-model:value="dynamicValidateForm.HTTPSamplerProtocol" />
          </a-form-item>

          <a-form-item label="方法" :rules="{
            required: true,
          }">
            <a-input v-model:value="dynamicValidateForm.HTTPSamplerMethod" />
          </a-form-item>

          <a-form-item :name="['samples', index]" label="请求体" :rules="{
            required: true,
          }">
            <a-input v-model:value="dynamicValidateForm.HTTPSamplerPayload" />
          </a-form-item>

          <MinusCircleOutlined @click="removesample(sample)" />
        </a-space>
        <a-form-item>
          <a-button type="dashed" block @click="addsample">
            <PlusOutlined />
            添加 HTTP 请求
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">创建</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="2" tab="导入导出" force-render="false">
      <a-form>
        <a-form-item label="测试计划" :name="samples.value" :rules="{
          required: true,
        }">
          <a-input v-model:value="dynamicValidateForm.testPlan" />
        </a-form-item>

        <a-input v-model:value="value" type="file" placeholder="Basic usage" />
        <a-button type="primary">创建</a-button>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, watch } from "vue";
import PageHeader from "@/components/PageHeader.vue";

export default defineComponent({
  name: "JmxEdit",
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    PageHeader,
  },

  setup() {
    const samples = {
      Beijing: ["Tiananmen", "Great Wall"],
      Shanghai: ["Oriental Pearl", "The Bund"],
    };
    const formRef = ref();
    const dynamicValidateForm = reactive({
      samples: [],
    });
    watch(
      () => dynamicValidateForm.area,
      () => {
        dynamicValidateForm.samples = [];
      }
    );

    const removesample = (item) => {
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

    const onFinish = (values) => {
      console.log("Received values of form:", values);
      console.log("dynamicValidateForm:", dynamicValidateForm);
    };

    return {
      formRef,
      dynamicValidateForm,
      onFinish,
      removesample,
      addsample,
      samples,
      activeKey: ref("2"),
    };
  },
});
</script>
