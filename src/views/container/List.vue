<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Name </span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
      </template>

      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag v-if="record.status === 'Running'" color="geekblue">
            {{ record.status.toUpperCase() }}
          </a-tag>
          <a-tag v-if="record.status === 'Succeeded'" color="green">
            {{ record.status.toUpperCase() }}
          </a-tag>
          <a-tag v-if="record.status === 'Pending'" color="yellow">
            {{ record.status.toUpperCase() }}
          </a-tag>
          <a-tag v-if="record.status === 'Failed'" color="red">
            {{ record.status.toUpperCase() }}
          </a-tag>
          <a-tag v-if="record.status === 'Unknown'" color="black">
            {{ record.status.toUpperCase() }}
          </a-tag>
        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <a-space wrap>
          <a-button @click="getJobLog(record)">查看日志</a-button>
          <a-button @click="deleteJob(record.name)">删除任务</a-button>
        </a-space>
      </template>
    </template>
  </a-table>

  <a-drawer v-model:visible="visible" class="custom-class" style="color: black" title="运行日志" width="800"
    placement="right" @after-visible-change="afterVisibleChange" @close="closeLog">
    <a-typography-paragraph v-for="mesg in mesgs" v-bind:key="mesg">
      <blockquote>{{ mesg }}</blockquote>
    </a-typography-paragraph>
  </a-drawer>
</template>
<script>
import { tink_task_status } from '@/api/preometheus';
import { requestInstance } from "@/api/request";
import { Modal, notification } from "ant-design-vue";
import { defineComponent, ref, onBeforeUnmount, onBeforeMount, onMounted } from "vue";

const columns = [
  {
    title: "timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    name: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "image",
    key: "image",
    dataIndex: "image",
  },
  {
    title: "type",
    key: "type",
    dataIndex: "type",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "action",
    key: "action",
  },
];

export default defineComponent({
  name: "ContainerList",
  components: {},

  setup() {
    const data = ref([]);
    const mesgs = ref([]);
    const visible = ref(false);
    const afterVisibleChange = (bool) => {
      console.log("visible", bool);
    };
    const closeLog = () => {
      mesgs.value = [];
      console.log("关闭日志");
    };

    const deleteJob = async (name) => {
      Modal.error({
        title: "确定删除？",
        closable: true,
        async onOk() {
          await requestInstance({
            method: "delete",
            url: "/tink/job/" + name,
          }),
            data.value.forEach((element) => {
              if (element.name == name) {
                data.value.pop(element);
              }
            });
          notification.open({
            duration: 1,
            message: "删除成功",
            onClick: async () => { },
          });
        },
      });
    };
    const getJobLog = async (record) => {
      visible.value = true;
      const resp = await requestInstance({
        method: "post",
        url: "/analysis/raw",
        data: {
          index: "logs",
          key_words: {
            "pod.name": record.name,
            "container.name": record.type,
          },
          from_: 0,
          size: 10000,
        },
      });
      resp.data.messages.forEach((element) => {
        mesgs.value.push(element);
      });
      if (resp.data.total == 0) {
        mesgs.value.push("暂无日志");
      }
    };

    onBeforeMount(async () => {
      const resp = await requestInstance({
        method: 'get',
        url: '/tink/jobs',
        params: {
          _from: 0,
          size: 20
        }
      })
      const jobs = []
      resp.data._sources.forEach(element => {
        if (element.type == 'konika') {
          element.image = element.container.image
          element.command = element.container.command
          delete element.container
          jobs.push(element)
        }
      });
      data.value = jobs
    }
    )

    onMounted(async () => {
      window.timer = setInterval(() => {
        const statusMap = {
          '0': 'Running',
          '1': 'Succeeded',
          '2': 'Pending',
          '3': 'Failed',
          '4': 'Unknown',
        }
        setTimeout(async () => {
          data.value.forEach(async element => {
            const resp = await tink_task_status(element.name)
            element.status = statusMap[resp.data.data.result[0].value[1]]
          });
        }, 0);
      }, 5000);
    })

    onBeforeUnmount(() => {
      clearInterval(window.timer);
    });

    return {
      data,
      columns,
      deleteJob,
      getJobLog,
      visible,
      afterVisibleChange,
      mesgs,
      closeLog,
      size: ref(10),
    };
  },

  methods: {},
});
</script>
