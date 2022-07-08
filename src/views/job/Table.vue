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
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag v-for="tag in record.tags" :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="deleteJmxJob(record.name)">删除</a>
          <a-divider type="vertical" />
          <a>重启</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script>
import { SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted } from 'vue';
import PageHeader from '@/components/PageHeader.vue'


import { getJob, deleteJob } from '@/api/job';
var dayjs = require('dayjs')


const data = ref([])

const columns = [{
  name: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}, {
  title: 'Time',
  dataIndex: 'time',
  key: 'time',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
}, {
  title: 'Action',
  key: 'action',
}];

const getJmxJob = async () => {
  const resp = await getJob()

  console.log(resp.data)
  const td = []
  for (var i of resp.data) {

    const c = {
      key: i,
      type: 'jmx',
      name: i,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      tags: ['cool', 'teacher'],
    }
    td.push(c)
  }
  data.value = td
}

export default defineComponent({
  name: 'JobTable',
  components: {
    SmileOutlined,
    PageHeader
  },

  setup() {

    onMounted(() => {
      getJmxJob()

    })
    return {
      data,
      columns
    };
  },

  methods: {
    async deleteJmxJob(name) {
      await deleteJob(name)
      alert('done')
      getJmxJob()
    }
  }

});
</script>