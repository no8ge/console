<template>
  <PageHeader></PageHeader>
  <h2 style="text-align: center">体は剣で出来ている</h2>
  <h2 style="text-align: center">血潮は鉄で心は硝子</h2>
  <h2 style="text-align: center">几たびの戦场を越えて不败</h2>
  <h2 style="text-align: center">ただの一度も败走はなく</h2>
  <h2 style="text-align: center">ただの一度も理解されない</h2>
  <h2 style="text-align: center">彼の者は常に独り 剣の丘で胜利に酔う</h2>
  <h2 style="text-align: center">故に、生涯に意味はなく</h2>
  <h2 style="text-align: center">その体は、きっと剣で出来ていた</h2>
  <HttpSample></HttpSample>
  <!-- <ThreadGroup></ThreadGroup> -->
  <a-button @click="sumit">sumit</a-button>

</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import HttpSample from "@/components/jmx/HttpSample.vue";
// import ThreadGroup from "@/components/jmx/ThreadGroup.vue";

export default {
  name: "DashBord",
  components: {
    PageHeader,
    HttpSample,
    // ThreadGroup
  },

  setup() {
    return {};
  },
  methods: {
    sumit() {
      // console.log(httpSample.value);
    },
  },
};
</script>
