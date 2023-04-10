<template>
<div>
  <Loader v-if="loading" :loading="loading" />

  <v-row v-else>
    <v-col cols="12" sm="12" md="6">
      <v-card flat outlined>
        <v-card-title> {{ id == 'new'? 'สร้าง':'อัพเดท' }} รายรับ</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="form_valid">
            <v-text-field v-model="form.inc_exp_title" label="หัวข้อ" placeholder="หัวข้อ" outlined dense :rules="[rules.required]"></v-text-field>
            <v-text-field v-model="form.inc_exp_amount" label="จำนวนเงิน" placeholder="จำนวนเงิน" outlined dense :rules="[rules.required]" type="number"></v-text-field>
            <!-- <v-select v-model="form.inc_exp_group" :items="lists_group" label="กลุ่ม" outlined item-text="inc_exp_type_name" item-value="inc_exp_type_value" dense :rules="[rules.required]"></v-select> -->
            <v-dialog ref="dialog" v-model="model_date" :return-value.sync="form.inc_exp_date" persistent width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="textDate" label="วันที่" prepend-inner-icon="mdi-calendar" outlined dense readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="form.inc_exp_date" scrollable locale="th">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="model_date = false">
                  ยกเลิก
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(form.inc_exp_date)">
                  ตกลง
                </v-btn>
              </v-date-picker>
            </v-dialog>
            <v-textarea v-model="form.inc_exp_note" label="โน๊ต บันทึก" placeholder="โน๊ต บันทึก" rows="1" prepend-inner-icon="mdi-comment" outlined></v-textarea>
            <v-text-field v-show="false" v-model="form.inc_exp_type" outlined dense :rules="[rules.required]"></v-text-field>
            <v-row>
              <v-col cols="12">
                <span>ประเภทการชำระเงิน</span>
              </v-col>
              <v-col cols="auto" v-for="(list,index) in lists_type" :key="index" @click="setTypes(list.inc_exp_type_id)">
                <v-btn :elevation="0" fab dark small :class="form.inc_exp_type == list.inc_exp_type_id ? list.inc_exp_type_color + ' active': list.inc_exp_type_color">
                  <v-icon dark small>{{ list.inc_exp_type_icon }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <div class="text-center mt-4">
              <v-btn color="default" class="mx-1" depressed rounded @click="$router.back()">
                <v-icon left small>fa fa-times</v-icon>
                ยกเลิก
              </v-btn>
              <v-btn color="primary" class="mx-1" depressed rounded :disabled="!form_valid" @click="saveForm(form)">
                <v-icon left small>fa fa-check</v-icon>
                {{ (id && id != 'new')? 'อัพเดท': 'บันทึก' }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      form: {
        inc_exp_date: this.$moment().format('YYYY-MM-DD'),
        inc_exp_type: null,
        inc_exp_group: 'income'
      },
      loading: false,
      form_valid: true,
      model_date: false,
      id: this.$route.params.id,
      rules: {
        required: value => !!value || "กรุณากรอกข้อมูล"
      },
    }
  },
  computed: {
    ...mapGetters({
      lists_type: 'service/lists_type',
      lists_group: 'service/lists_group'
    }),
    textDate() {
      return new Date(this.form.inc_exp_date).toLocaleDateString()
    },
  },
  methods: {
    ...mapActions({
      loadInfo: 'income_expense/loadInfo',
      create: 'income_expense/create',
      update: 'income_expense/update',
      loadDataGroup: 'service/loadDataGroup',
      loadDataType: 'service/loadDataType'
    }),
    async getInfo(id) {
      this.loading = true
      const res = await this.loadInfo(id)
      this.loading = false
      if (res.status) {
        this.form = res.payload
        this.form.created_date = this.$moment(this.form.created_date).format('YYYY-MM-DD')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: res.message,
        }).then((result) => {
          if (result.isConfirmed || !result.isConfirmed) {
            this.$router.back()
          }
        })
      }
    },
    setTypes(value) {
      this.form.inc_exp_type = value
      this.$forceUpdate()
    },
    async saveForm(form) {
      if (this.id == 'new') {
        await this.createData(form)
      } else {
        await this.updateData(form._id, form)
      }
    },

    async createData(form) {
      const res = await this.create(form)
      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
        }).then((result) => {
          if (result.isConfirmed || !result.isConfirmed) {
            this.$router.replace('/income')
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
        })
      }
    },

    async updateData(id, form) {
      const res = await this.update({id, form})
      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
        }).then((result) => {
          if (result.isConfirmed || !result.isConfirmed) {
            this.$router.replace('/income')
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
        })
      }
    }
  },
  async created() {
    await this.loadDataType()
    await this.loadDataGroup()

    if (this.id && this.id != 'new') {
      await this.getInfo(this.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.active {
  transform: scale(1.5);
}
</style>
