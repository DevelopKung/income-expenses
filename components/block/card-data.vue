<template>
<div>
  <div class="d-flex justify-space-between align-center ma-2">
    <div class="caption">รายละเอียด</div>
    <div class="caption cursor">
      <v-btn v-if="mode_page == 'income'" @click="openForm('new')" text color="success"> เพิ่มรายรับ </v-btn>
      <v-btn v-if="mode_page == 'expense'" @click="openForm('new')" text color="error"> เพิ่มรายจ่าย </v-btn>
      <v-dialog v-if="!mode_page">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="error" v-bind="attrs" v-on="on"> เพิ่มรายการ </v-btn>
        </template>

        <v-card class="pa-4">
          <v-row>
            <v-col sm="6" cols="12">
              <v-btn color="success" block rounded @click="$router.push('/income/new')">
                เพิ่มรายรับ <v-icon right>fas fa-plus-circle</v-icon>
              </v-btn>
            </v-col>
            <v-col sm="6" cols="12">
              <v-btn color="error" block rounded @click="$router.push('/expense/new')">
                เพิ่มรายจ่าย <v-icon right>fas fa-minus-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

    </div>
  </div>
  <v-card min-height="40vh" class="pa-4">
    <div v-if="datas && datas.length>0">
      <v-row v-for="(item,index) in datas" :key="index">
        <v-col v-if="item.type&&item.type.length > 0" cols="auto">
          <v-btn :class="item.type[0].inc_exp_type_color" :elevation="0" fab dark small>
            <v-icon dark small> {{ item.type[0].inc_exp_type_icon }} </v-icon>
          </v-btn>
        </v-col>
        <v-col class="align-self-center">
          <div><b>{{ item.inc_exp_title }}</b></div>
          <div class="caption"> หมายเหตุ: {{ item.inc_exp_note }} </div>
        </v-col>
        <v-col cols="auto" class="align-self-center">
          <b :class="item.inc_exp_group == 'income'? 'success--text':'error--text'">{{ item.inc_exp_amount | numeral('0,0.00') }} </b>
          <div class="caption">{{ new Date(item.inc_exp_date).toLocaleDateString() }}</div>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </div>
  </v-card>

</div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: ''
    },
    datas: {
      type: Array,
      default:() => []
    }
  },
  data() {
    return {
      mode_page: null,
      items: [{
          text: 'ช้อปปิ้ง',
          value: 'shopping',
          icon: 'fas fa-shopping-cart',
          color: 'bg-color-primary',
          type: 'inc'
        },
        {
          text: 'รถ',
          value: 'car',
          icon: 'fas fa-car-side',
          color: 'bg-color-info',
          type: 'inc'
        },
        {
          text: 'บ้าน',
          value: 'home',
          icon: 'fas fa-home',
          color: 'bg-color-warning',
          type: 'exp'
        },
        {
          text: 'อาหาร',
          value: 'food',
          icon: 'fas fa-utensils',
          color: 'bg-color-error',
          type: 'inc'
        },
        {
          text: 'ของขวัญ',
          value: 'food',
          icon: 'fas fa-gift',
          color: 'bg-color-primary',
          type: 'inc'
        },
        {
          text: 'อื่นๆ',
          value: 'etc',
          icon: 'fas fa-comment-dollar',
          color: 'bg-color-danger',
          type: 'exp'
        },
      ],
    }
  },
  methods: {
    openForm() {
      if (this.mode_page == 'income') {
        this.$router.replace('/income/new')
      } else if (this.mode_page == 'expense') {
        this.$router.replace('/expense/new')
      }
    },
  },
  created() {
    if (this.$route.path == '/income') {
      this.mode_page = 'income'
    } else if (this.$route.path == '/expense') {
      this.mode_page = 'expense'
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-card { border-radius: 20px;  }
</style>
