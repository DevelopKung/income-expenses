<template>
<div class="page-login d-flex justify-center align-center">
  <div>
    <v-card v-show="show_login" class="px-4 py-6" width="350" :elevation="4">
      <v-img src="https://cdn.mos.cms.futurecdn.net/Xv3k77UcipignuVPtHsC43.jpg"></v-img>
      <h3>LOGIN</h3>
      <div>
        <v-form ref="form_login" v-model="valid_login" lazy-validation @submit.prevent="onSubmit()" autocompete="new" class="mt-4" autocomplete="off">
          <v-text-field v-model="member.username" :rules="requireRules" label="ชื่อเข้าใช้งาน"></v-text-field>
          <v-text-field 
            autocomplete="off" 
            :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'" 
            :rules="requireRules" :type="show_pwd ? 'text' : 'password'" 
            name="input-10-2" label="รหัสผ่าน" 
            v-model="member.password"
            @click:append="show_pwd = !show_pwd">
          </v-text-field>
          <v-btn type="submit" rounded class="mt-2" color="info" :loading="loading" depressed large :disabled="!member.username || !member.password" block> เข้าสู่ระบบ </v-btn>
        </v-form>
        <v-btn rounded class="mt-2" color="success" depressed large block @click="changeMode('login')"> สมัครสมาชิก </v-btn>
      </div>
    </v-card>

    <v-card v-show="!show_login" class="px-4 py-6" width="350" :elevation="4">
      <v-img src="https://cdn.mos.cms.futurecdn.net/Xv3k77UcipignuVPtHsC43.jpg"></v-img>
      <h3>REGISTER</h3>
      <div>
        <v-form ref="form_register" v-model="valid_register" lazy-validation @submit.prevent="registerData()" autocompete="new" class="mt-4" autocomplete="off">
          <v-text-field v-model="form_regis.first_name" :rules="requireRules" label="ชื่อ"></v-text-field>
          <v-text-field v-model="form_regis.last_name" :rules="requireRules" label="นามสกุล"></v-text-field>
          <v-text-field v-model="form_regis.username" :rules="requireRules" label="ชื่อผู้ใช้"></v-text-field>
          <v-text-field v-model="form_regis.password" :rules="requireRules" label="รหัสผ่าน" type="password"></v-text-field>
          <v-select v-model="form_regis.sex" :items="sexs" label="เพศ" required item-text="text" item-value="value"></v-select>
          <v-btn type="submit" rounded class="mt-2" color="info" :loading="loading" depressed large 
          :disabled="!form_regis.first_name || !form_regis.last_name || !form_regis.username || !form_regis.password" 
          block> เข้าสู่ระบบ </v-btn>
        </v-form>
        <v-btn rounded class="mt-2" color="success" depressed large block @click="changeMode('register')"> กลับ </v-btn>
      </div>
    </v-card>
    
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  layout: 'blank',
  data() {
    return {
      show_pwd: false,
      loading: false,
      valid_login: true,
      valid_register: true,
      requireRules: [v => !!v || 'กรุณากรอกข้อมูล'],
      member: {
        username: "",
        password: ""
      },
      form_regis: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        sex: "male"
      },
      sexs: [
        { text: 'ชาย', value: 'male'},
        { text: 'หญิง', value: 'female'}
      ],
      show_login: true
    }
  },
  methods: {
    ...mapActions({
      register: 'register/register'
    }),
    async onSubmit() {
      this.loading = true
      try {
        const auth = await this.$auth.loginWith('local', { 
          data: {
            username: this.member.username,
            password: this.member.password
          } 
        })
        if (auth.data.status == true) {
          this.$router.replace("/")
        } else {
          await this.$auth.logout()
        }
      } catch (err) {
        this.loading = false
      }
    },
    async changeMode(mode){
      if (mode == 'register') {
        await this.$refs.form_register.reset()
        this.show_login = true
      } else {
        await this.$refs.form_login.reset()
        this.show_login = false
      }
    },
    async registerData(){
      let res = await this.register(this.form_regis)
      if (res.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
        }).then(() => {
          this.changeMode('login')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-login {
  height: 100vh;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
