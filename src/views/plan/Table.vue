<template>
  <PageHeader></PageHeader>
  <a-upload v-model:file-list="fileList" name="file" :action="action" :headers="headers" @change="handleChange">
    <a-button type="primary">
      <upload-outlined></upload-outlined>
      上传测试文件
    </a-button>
  </a-upload>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <file-outlined />
          Name
        </span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag v-for="tag in record.tags" :key="tag" :color="
            tag === 'loser'
              ? 'volcano'
              : tag.length > 5
                ? 'geekblue'
                : 'green'
          ">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="deleteJmx(record.name)">删除</a>
          <a-divider type="vertical" />
          <a @click="downloadJmx(record.name)">下载</a>
          <a-divider type="vertical" />
          <a @click="remakeJmx(record.name)">添加后端监听器</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script>
import { FileOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { deleteFile, reMake,getFiles } from "@/api/file";
// import { getPlans } from "@/api/file";
import PageHeader from "@/components/PageHeader.vue";

var dayjs = require("dayjs");

const data = ref([]);

const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];

const getDate = async () => {
  const resp = await getFiles();
  // const resp = await getPlans();

  console.log(resp.data.details)

  const td = [];
  for (var i = 0; i < resp.data.details.length; i++) {
    const c = {
      key: i,
      type: "jmx",
      name: resp.data.details[i],
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      tags: ["cool", "teacher"],
    };
    td.push(c);
  }
  data.value = td;
};

export default defineComponent({
  name: "JmxTable",
  components: {
    FileOutlined,
    UploadOutlined,
    PageHeader,
  },

  setup() {
    const handleChange = (info) => {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        getDate();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const fileList = ref([]);
    onMounted(() => {
      getDate();
    });
    return {
      fileList,
      action: "http://tink.com:31695/files",
      headers: {
        authorization: "authorization-text",
      },
      handleChange,
      data,
      columns,
    };
  },

  methods: {
    async deleteJmx(name) {
      await deleteFile(name);
      alert("done");
      getDate();
    },
    async downloadJmx() {
      alert("done");
    },
    async remakeJmx(name) {
      await reMake(name);
      alert("done");
      getDate();
    },
  },
});
</script>
