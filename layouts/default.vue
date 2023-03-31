<template>
<div>
  <v-app>
    <div v-if="$auth.user" class="d-flex justify-space-between align-center pa-4">
      <div class="d-flex">
        <v-avatar size="50" color="#eee">
          <v-icon v-if="$auth.user.sex == 'female'" color="pink">fas fa-female</v-icon>
          <v-icon v-else color="primary">fas fa-male</v-icon>
        </v-avatar>
        <div class="ml-4">
          <small>ยินดีตอนรับ</small>
          <h3 style="line-height: 0.8;">{{ $auth.user.first_name }} {{ $auth.last_name }}</h3>
        </div>
      </div>
      <div>
        <v-menu v-if="$auth.loggedIn" transition="slide-y-transition" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="1" class="mx-2" fab dark small color="pink" v-bind="attrs" v-on="on">
              <v-icon dark> fas fa-cog </v-icon>
            </v-btn>
          </template>

          <v-card width="300">
            <UserMiniInfo />
            <v-divider></v-divider>
            <div class="text-center">
              <v-btn block text @click="logout()">
                <v-icon small left>fas fa-sign-out-alt</v-icon> logout
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </div>
    </div>
    <div class="pa-4">
      <Nuxt />
    </div>
    <Footer />
    <!-- <Navbar :title="'รายรับ รายจ่าย'">
      <div class="mt-12 bg-img">
        <v-container>
          <Nuxt />
        </v-container>
        <Footer />
      </div>
    </Navbar> -->
  </v-app>
</div>
</template>

<script>
import UserMiniInfo from '@/components/navbar/MiniInfo'
export default {
  components: {
    UserMiniInfo
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    logout(){
      this.$router.replace('/logout')
    }
  },
}
</script>

<style lang="scss" scoped>
v-app,
.v-application {
  min-height: 100vh;
  width: 100% !important;
  background: #eeeeee7c;
}

.bg-img {
  background-image: url('https://img.freepik.com/free-vector/technology-background-with-hexagonal-net_79603-303.jpg');
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &:before {
    content: "";
    background: rgba(255, 255, 255, 0.312);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
