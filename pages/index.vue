<template>
  <div>
    <Card :mode="'ALL'" />
    <cardData :mode="'ALL'" :datas="lists" />
  </div>
</template>

  
<script>
import Card from "@/components/block/card.vue";
import cardData from "@/components/block/card-data.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Card,
    cardData,
  },
  computed: {
    ...mapGetters({
      lists: "income_expense/lists",
    }),
  },
  methods: {
    ...mapActions({
      loadData: "income_expense/loadData",
    }),
    async getData(){
      await this.loadData()
    }
  },
  async fetch(){
    await this.getData()
  }
};
</script>

  
<style lang="scss" scoped>
</style>
