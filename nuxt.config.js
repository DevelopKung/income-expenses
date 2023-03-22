import colors from 'vuetify/es5/util/colors'
const env = require('dotenv').config()
let url_api = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV : process.env.URL_API;
let base_url = process.env.NODE_ENV == 'development' ? '/' : process.env.GITPAGES_NAME

export default {
  publicRuntimeConfig: {
    myApp: {
      version: "1.0.0"
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Income-Expenses',
    title: 'Income Expenses',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600&display=swap' }
    ]
  },
  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~plugins/vuetify.js', mode: 'client' },
    { src: '~plugins/load-image.js', mode: 'client' },
    { src: '~plugins/VueNumeral.js', mode: 'client' },
    { src: '~plugins/draggable.js', mode: 'client' },
    { src: '~plugins/sweetalert.js', mode: 'client' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    base: base_url,
    middleware: ['auth']
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'vue-sweetalert2/nuxt'
  ],

  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },

  moment: {
    defaultTimezone: 'Asia/Bangkok'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/logout',
      callback: '/login',
      home: '/'
    },
    // localStorage: {
    //   prefix: 'auth.'
    // },
    token: {
      prefix: process.env.AUTH_TOKEN_PREFIX
    },
    cookie: {
      prefix: 'o2.',
      options: {
        domain: process.env.AUTH_DOMAIN
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            headers: { 'Content-Type': 'multipart/form-data' },
            url: '/btv-api/util/user/authenticate',
            method: 'post',
            propertyName: 'access_token'
          },
          user: {
            url: '/btv-api/util/user/info',
            method: 'get',
            propertyName: 'payload'
          }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true
      }
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/',
    proxyHeaders: false,
    credentials: false,
    proxy: (process.env.NODE_ENV !== 'production')
  },

  proxy: {
    '/api': { target: url_api, changeOrigin: true, pathRewrite: { '^/api': '/' } },
  },

  loading: {
    color: '#cccccc',
    height: '2px'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Noto Sans Thai'
      }
    },
    theme: {
      options: {
        customProperties: true,
      },
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#0D47A1'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        prettify: false
      }
    },
  },

  server: {
    port: process.env.PORT || 5002
  }
}