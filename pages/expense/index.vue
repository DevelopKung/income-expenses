<template>
  <div>
    <Card :mode="'Expense'" />
    <CardData :mode="'Expense'" :datas="setLists" />
  </div>
  </template>
  
  <script>
  import Card from '@/components/block/card.vue'
  import CardData from '@/components/block/card-data.vue'
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    components: { Card, CardData, },
    computed: {
      ...mapGetters({
        lists: "income_expense/lists",
      }),
      setLists(){
        return this.lists.filter(x => x.inc_exp_group == 'expense')
      }
    },
    methods: {
      ...mapActions({
        loadData: "income_expense/loadData",
      }),
      async getData(){
        await this.loadData()
      }
    },
    async created(){
      await this.getData()
    }
  };
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  