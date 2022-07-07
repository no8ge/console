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
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: "DashBord",
  components: {
    PageHeader,
  },

  setup() {
    return {
      options: [
        { value: "a", label: 1 },
        { value: "b", label: 2 },
      ],
    };
  },
};
</script>
