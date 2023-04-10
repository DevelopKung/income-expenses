<template>
<div>
  <div class="d-flex justify-space-between align-center ma-2">
    <div class="caption">รายละเอียด</div>
    <div class="caption cursor">
      <v-btn v-if="mode_page == 'income'" @click="openForm()" text color="success"> เพิ่มรายรับ </v-btn>
      <v-btn v-if="mode_page == 'expense'" @click="openForm()" text color="error"> เพิ่มรายจ่าย </v-btn>
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
  <v-card min-height="40vh" class="pa-4" outlined>
    <div v-if="datas && datas.length>0">
      <v-row v-for="(item,index) in datas" :key="index" align="center" style="position: relative;">
        <v-col v-if="item.type&&item.type.length > 0" cols="auto">
          <v-btn :class="item.type[0].inc_exp_type_color" :elevation="0" fab dark small>
            <v-icon dark small> {{ item.type[0].inc_exp_type_icon }} </v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <div><b>{{ item.inc_exp_title }}</b></div>
          <div class="caption"> หมายเหตุ: {{ item.inc_exp_note }} </div>
        </v-col>
        <v-col cols="auto">
          <b :class="item.inc_exp_group == 'income'? 'success--text':'error--text'">{{ item.inc_exp_amount | numeral('0,0.00') }} </b>
          <div class="caption">{{ new Date(item.inc_exp_date).toLocaleDateString() }}</div>
        </v-col>
        <v-col cols="auto" class="d-block">
          <div class="mb-1">
            <v-btn depressed fab dark x-small color="info" @click="openFormEdit(item._id, item.inc_exp_group)">
              <v-icon dark>
                fas fa-wrench 
              </v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn depressed fab dark x-small color="error"  @click="deleteData(item._id)">
              <v-icon dark>
                fas fa-trash 
              </v-icon>
            </v-btn>
          </div>
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
import { mapActions } from "vuex";
import Swal from 'sweetalert2'
export default {
  props: {
    mode: {
      type: String,
      default: ''
    },
    datas: {
      type: Array,
      default: () => []
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
    ...mapActions({
      loadData: "income_expense/loadData",
      delete: "income_expense/delete",
    }),
    openForm() {
      if (this.mode_page == 'income') {
        this.$router.replace('/income/new')
      } else if (this.mode_page == 'expense') {
        this.$router.replace('/expense/new')
      }
    },
    openFormEdit(id, path) {
      if (path == 'income') {
        this.$router.replace('/income/' + id)
      } else if (path == 'expense') {
        this.$router.replace('/expense/'+ id)
      }
    },
    async deleteData(id) {
      Swal.fire({
        title: 'ต้องการลบข้อมูลจริงหรือไม่ ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ไม่'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let res = await this.delete(id)
          if (res.status == false) {
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
            })
          } else {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'ลบสำเร็จ',
            })
            await this.loadData()
          }
        }
      })
    }
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
::v-deep .v-card {
  border-radius: 20px;
}

::v-deep .v-icon {
  cursor: pointer;
}
</style>
