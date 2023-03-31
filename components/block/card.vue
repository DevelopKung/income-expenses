<template>
<div class="card-box">
  <div class="bg-color text-center">
    <div class="white--text">ยอดรวม</div>
    <h1 class="ml-2 white--text py-4">{{ totalAmount | numeral('0,0.00') }} บาท</h1>
    <div class="box">
      <v-card v-if="mode=='ALL'||mode=='Income'" :elevation="0" class="px-5 py-2">
        <div class="d-flex align-center">
          <v-badge bordered offset-x="16" offset-y="16" color="success" icon="mdi-plus" overlap>
            <v-btn :elevation="0" fab small>
              <v-icon>fas fa-chart-line</v-icon>
            </v-btn>
          </v-badge>
          <div class="text-right success--text">
            <h3 style="line-height: 0.8;" class="ml-4">รายรับ</h3>
            <small><b>{{ totalIncome | numeral('0,0.00') }}</b></small>
          </div>
        </div>
      </v-card>
      <v-card v-if="mode=='ALL'||mode=='Expense'" :elevation="0" class="px-5 py-2">
        <div class="d-flex align-center">
          <v-badge bordered offset-x="16" offset-y="16" color="error" icon="mdi-minus" overlap>
            <v-btn :elevation="0" fab small>
              <v-icon>fas fa-chart-line</v-icon>
            </v-btn>
          </v-badge>
          <div class="text-right error--text">
            <h3 style="line-height: 0.8;" class="ml-4">รายจ่าย</h3>
            <small><b>{{ totalExpense | numeral('0,0.00') }}</b></small>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    mode: {
      type: String,
      default: 'ALL'
    }
  },
  
  computed: {
    ...mapGetters({
      lists: "income_expense/lists",
    }),

    totalExpense(){
      let lists = Object.assign([], this.lists)
      lists = lists.filter(x => x.inc_exp_group == 'expense').reduce((a, b) => a+b.inc_exp_amount, 0)
      return lists
    },

    totalIncome(){
      let lists = Object.assign([], this.lists)
      lists = lists.filter(x => x.inc_exp_group == 'income').reduce((a, b) => a+b.inc_exp_amount, 0)
      return lists
    },

    totalAmount(){
      if (this.totalIncome > 0 || this.totalExpense > 0) {
        if (this.$route.path == '/') {
          return (this.totalIncome - this.totalExpense)
        } else  if (this.$route.path == '/income') {
          return this.totalIncome
        } else  if (this.$route.path == '/expense') {
          return this.totalExpense
        }
      }
      return 0
    }
  },
}
</script>

<style lang="scss" scoped>
.card-box {
  margin-bottom: 3rem ;
  .bg-color {
    background: linear-gradient(140deg, #2daae4 10%, #cb68fd 50%, #f87550);
    padding: 20px;
    border: 1px solid #eeeeee69;
    border-radius: 20px;
  }

  ::v-deep .v-card { border-radius: 12px;  }
  .box {
    display: flex;
    justify-content: space-around;
    position: relative;
    top: 3rem;
  }
}
</style>
