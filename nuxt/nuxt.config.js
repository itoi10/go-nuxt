export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "bulma",
    "@fortawesome/fontawesome-free/css/all.css",
    "@fortawesome/fontawesome-free/css/brands.css",
    "@fortawesome/fontawesome-free/css/fontawesome.css",
    "@fortawesome/fontawesome-free/css/regular.css",
    "@fortawesome/fontawesome-free/css/solid.css",
    "@fortawesome/fontawesome-free/css/svg-with-js.css",
    "@fortawesome/fontawesome-free/css/v4-shims.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "./plugins/vue-youtube",
    "./plugins/cookies-to-state",
    './plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  // APIサーバのエンドポイントをデフォルトのリクエスト先とする
  axios: {
    baseURL: 'http://localhost:8080/'
  },
  proxy: {
    '/api': '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
