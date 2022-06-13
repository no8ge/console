<template>
  <el-container>
    <el-header>{{ jmx }} {{ msg }}</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <el-upload class="upload-demo" name="file" action="http://127.0.0.1:8004/files/" :on-preview="handlePreview"
            :on-change="handlechange" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
            :on-exceed="handleExceed" :file-list="fileList">
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
          <el-table :data="tableData" style="width: 100%">
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
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const tableData = ref([])

const getList = async () => {
  const resp = await axios.get('http://127.0.0.1:8004/files')

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

    })
    return {
      tableData
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
      await axios.delete(`http://127.0.0.1:8004/files/${name}`)
      getList()
    },
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
