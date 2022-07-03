<template>
  <h1>to do</h1>
  <h2>what to do</h2>
  <h3>why to do</h3>

  <a-select style="width: 200px" :options="options"></a-select>

</template>
<script>

export default {
  name: "DashBord",

  setup() {

    return {
      options: [{ value: 'a', label: 1 }, { value: 'b', label: 2 }]
    }
  }
}
</script>
