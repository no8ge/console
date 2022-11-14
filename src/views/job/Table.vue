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
</template>
<script>
import { requestInstance } from '@/api/ooxx'
import { notification } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, h, onMounted } from 'vue';
import PageHeader from '@/components/PageHeader.vue'


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
        content: '任务可能执行中,你真的要删除吗？',
        onOk() {
          notification.open({
            duration:2,
            message: '删除成功',
            description: '任务删除成功',
            onClick: () => {
              console.log('Clicked!');
            },
          })
        }
      });
      await requestInstance({
        method: 'delete',
        url: '/tink/job/' + name
      })
    };
    const getJobLog = async (record) => {
      const resp = await requestInstance({
        method: 'get',
        url: '/analysis/raw',
        params: {
          task_name: record.name,
          task_tag: record.type,
          _from: 0,
          size: 200
        }

      })
      const c = []
      resp.data.messages.forEach(element => {
        c.push(h('p', element))
      });

      Modal.warning({
        title: '日志',
        width: 1000,
        content: h('div', {}, [h('p', c)])
      });
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
    };
  },

  methods: {}

});
</script>