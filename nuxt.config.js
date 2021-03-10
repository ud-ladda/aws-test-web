// import colors from 'vuetify/es5/util/colors'
import webpack from 'webpack'

require('dotenv').config()
require('dotenv-safe').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Risk Assessment System',
    title: 'RAS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/scss/main.scss'],
  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/repositories.js',
    '~/plugins/filter.js',
    '~/plugins/validation.js',
    '~/plugins/apis.js',
    '~/plugins/enum.js',
    '~/plugins/localStorage.js',
    '~/plugins/permission.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BACKEND_API,
  },
  /* static: {
    prefix: true,
  }, */
  /*   build: {
    publicPath: 'http://rmo.scg.com/RAS/dodev/Pages/nuxt/_nuxt',
  }, */
  generate: {
    fallback: '/',
    subFolders: false,
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/vuetify-variables.scss'],
    theme: {
      // dark: true,
      themes: {
        light: {
          primary: '#277DA3',
          'primary-variant': '#5095B3',
          secondary: '#DD7223',
          'secondary-varaint': '#F08A3F',
          error: '#B00020',
          cobalt: '#243990',
        },
      },
    },
  },
  router: {
    middleware: ['auth'],
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  // eslint-disable-next-line no-dupe-keys
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
    ],
  },
}
