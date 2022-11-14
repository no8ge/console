<template>
  <PageHeader></PageHeader>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
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
      <template v-else-if="column.key === 'action'">
        <a-space wrap>
          <a-button @click="getJobStats(record.name)">查看状态</a-button>
          <a-button @click="getReport(record)">查看报告</a-button>
          <a-button @click="getJobLog(record)">查看日志</a-button>
          <a-button @click="deleteJob(record.name)">删除任务</a-button>
        </a-space>
      </template>
    </template>
  </a-table>

  <a-drawer v-model:visible="visible" class="custom-class" style="color: black" title="运行日志" width="800"
    placement="right" @after-visible-change="afterVisibleChange" @close="closeLog">
    <p v-for="mesg in mesgs" v-bind:key="mesg">{{ mesg }}</p>
  </a-drawer>

</template>
<script>
import { requestInstance } from '@/api/ooxx'
import PageHeader from '@/components/PageHeader.vue'
import { Modal, notification } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, h, onMounted } from 'vue';


const columns = [
  {
    name: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'command',
    key: 'command',
    dataIndex: 'command',
  },
  {
    title: 'prefix',
    key: 'prefix',
    dataIndex: 'prefix',
  },
  {
    title: 'action',
    key: 'action',
  }
];


export default defineComponent({
  name: 'JobTable',
  components: {
    SmileOutlined,
    PageHeader
  },

  setup() {

    const data = ref([])
    const timer = ref(null);
    const mesgs = ref([])
    const visible = ref(false);
    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };
    const closeLog = () => {
      console.log('关闭日志')
    }

    const getJobStats = async (name) => {
      const resp = await requestInstance({
        method: 'get',
        url: '/tink/job/' + name
      })
      Modal.info({
        title: '任务状态',
        content: h('div', {}, [
          h('p', '容器 0:' + JSON.stringify(resp.data.status.container_statuses[0].state)),
          h('p', '容器 1:' + JSON.stringify(resp.data.status.container_statuses[1].state))]),
      });
    };
    const getReport = async (record) => {
      const resp = await requestInstance({
        method: 'get',
        url: `/files/report/${record.type}/${record.name}`
      })
      Modal.success({
        title: '测试报告',
        width: 1000,
        content: h('div', {}, [h('a', resp.data.url)]),
      });
    };
    const deleteJob = async (name) => {
      Modal.error({
        title: '确定删除？',
        content: '任务执行中,你真的要删除吗？',
        async onOk() {
          await requestInstance({
            method: 'delete',
            url: '/tink/job/' + name
          }),
            data.value.forEach(element => {
              if (element.name == name) {
                data.value.pop(element)
              }
            });
          notification.open({
            duration: 1,
            message: '删除成功',
            description: '任务删除成功',
            onClick: async () => { },
          })
        }
      });
    };
    const getJobLog = async (record) => {
      visible.value = true;
      timer.value = setInterval(async () => {
        const resp = await requestInstance({
          method: 'get',
          url: '/analysis/raw',
          params: {
            task_name: record.name,
            task_tag: record.type,
            _from: 0,
            size: 1
          }
        })
        resp.data.messages.forEach(element => {
          mesgs.value.push(element)
        });
      }, 1000);
    };
    onMounted(async () => {
      const resp = await requestInstance({
        method: 'get',
        url: '/tink/jobs',
        params: {
          _from: 0,
          size: 20
        }
      })
      resp.data._sources.forEach(element => {
        element.image = element.container.image
        element.command = element.container.command
        delete element.container
        data.value.push(element)
      });
    })
    return {
      data,
      columns,
      getJobStats,
      getReport,
      deleteJob,
      getJobLog,
      visible,
      afterVisibleChange,
      mesgs,
      closeLog
    };
  },

  methods: {}

});
</script>