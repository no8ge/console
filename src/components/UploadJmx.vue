<template>
  <el-container>
    <el-header>{{ jmx }} {{ msg }}</el-header>
    <el-container>
      <!-- <el-aside width="200px">Aside</el-aside> -->
      <el-container>
        <el-main>
          jmx
        </el-main>

        <el-main>
          <el-upload class="upload-demo" name="file" action="http://tink.com:31695/files" :on-preview="handlePreview"
            :on-change="handlechange" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
            :on-exceed="handleExceed" :file-list="fileList">
            <el-button type="primary">Click to upload jmx</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
          <el-table :data="tableData" style="width: 100%" align="center">
            <el-table-column fixed prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="type" label="type" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteFile(scope.$index)">delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>

        <el-main>
          job
        </el-main>

        <el-main>

          <el-form :model="form" label-width="120px">
            <el-form-item label="Nme">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Jmx">


              <!-- 自定义下拉框 -->
              <el-select v-model="form.jmx" placeholder="please select jmx file">
                <el-option v-for="item in tableData" :key="item.name" :label="item.name" :value="item.name"
                  :disabled="flase" />
              </el-select>
              <!-- 自定义下拉框 -->



              <!-- <el-select v-model="form.region" placeholder="please select jmx file">
                <el-option label="stand-alone" value="shanghai" />
                <el-option label="cluster" value="beijing" />
              </el-select> -->


            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="job type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Stand-alone" name="type" />
                <el-checkbox label="Cluster" name="type" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Job type">
              <el-radio-group v-model="form.resource">
                <el-radio label="Stand-alone" />
                <el-radio label="Cluster" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="describe">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button>Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-main>

        <el-main>
          <el-table :data="jobs" style="width: 100%" align="center">
            <el-table-column fixed prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="type" label="type" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteJmx(scope.$index)">delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>


        <el-footer>metrics</el-footer>

        <el-button type="success" align="center" @click="getReport">getMetrics</el-button>

        <el-table :data="metrics" style="width: 100%" align="center">
          <el-table-column fixed prop="application" label="application" width="120" />
          <el-table-column prop="result" label="result" width="120" />
          <el-table-column prop="statut" label="statut" width="120" />
          <el-table-column prop="table" label="table" width="120" />
          <el-table-column prop="transaction" label="transaction" width="120" />
          <el-table-column prop="_field" label="_field" width="120" />
          <el-table-column prop="_measurement" label="_measurement" width="120" />
          <el-table-column prop="_start" label="_start" width="120" />
          <el-table-column prop="_stop" label="_stop" width="120" />
          <el-table-column prop="_time" label="_time" width="120" />
          <el-table-column prop="_value" label="_value" width="120" />
        </el-table>

      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  jmx: '',
  // region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})


const tableData = ref([])
const jobs = ref([])
const metrics = ref([])

const getList = async () => {
  const resp = await axios.get('http://tink.com:31695/files')

  const td = []
  for (var i = 0; i < resp.data.details.length; i++) {
    const c = {
      date: '2016-05-03',
      name: resp.data.details[i],
      type: 'jmx'
    }
    td.push(c)
  }
  tableData.value = td
}


const getJobs = async () => {
  const resp = await axios.get('http://tink.com:31695/tink/jobs')

  const td = []
  for (var i = 0; i < resp.data.length; i++) {
    const c = {
      date: '2016-05-03',
      name: resp.data[i],
      type: 'job'
    }
    td.push(c)
  }
  jobs.value = td
}

export default {
  name: 'UploadJmx',
  data() {
    return {
      jmx: 'Hi,'
    }
  },
  props: {
    msg: String
  },
  setup() {
    onMounted(() => {
      getList()
      getJobs()

    })
    return {
      tableData,
      jobs,
      metrics,
      form
    }
  },

  methods: {
    async handlechange() {
      getList()
    },
    async handleRemove() {
    },
    async deleteFile(index) {
      alert('确认删除？')
      const name = tableData.value[index].name
      await axios.delete(`http://tink.com:31695/files/${name}`)
      getList()
    },
    async runJmx(index) {
      const name = tableData.value[index].name
      await axios.post('http://tink.com:31695/tink/job', { name: name, jmx: `/jmx/${name}` })
      getJobs()
      alert('运行成功')
    },
    async deleteJmx(index) {
      alert('确认删除？')
      const name = jobs.value[index].name
      await axios.delete(`http://tink.com:31695/tink/job/${name}`)
      getJobs()
    },
    async getReport() {
      const resp = await axios.post('http://tink.com:31695/analysis')
      metrics.value.push(resp.data)
    },
    async onSubmit() {
      await axios.post('http://tink.com:31695/tink/job', { name: form.name, jmx: `/jmx/${form.jmx}` })
      getJobs()
      alert('运行成功')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
