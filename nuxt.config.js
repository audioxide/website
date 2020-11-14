const {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  RSS_URL,
} = require('@/assets/siteConstants');

export default {
  mode: 'spa',
  /*
  ** Environment defaults
  */
  env: {
    apiUrl: `${process.env.API_URL || 'http://localhost:8888'}/`,
    searchUrl: process.env.SEARCH_URL || 'http://localhost:8889/search',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: SITE_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#121212'},
      { name: 'theme-color', content: '#121212' },
      { name: 'monetization', content: '$ilp.uphold.com/G7U2HWjBghge' },
      { name: 'fb:app_id', content: '950609285023482' },
      { property: 'og:site_name', content: SITE_NAME },
      // All entries below are changed by other components
      { vmid: 'description', name: 'description', content: SITE_DESCRIPTION },
      { vmid: 'og:url', property: 'og:url', content: `${SITE_URL}/` },
      { vmid: 'og:image', property: 'og:image', content: '' }, // TODO: Add sharer image
      { vmid: 'og:image', property: 'og:image:secure_url', content: '' }, // TODO: Add sharer image
      { vmid: 'og:type', property: 'og:type', content: 'website' },
      { vmid: 'og:title', property: 'og:title', content: SITE_NAME },
      { vmid: 'og:description', property: 'og:description', content: SITE_DESCRIPTION },
      { vmid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { vmid: 'twitter:site', name: 'twitter:site', content: `@${TWITTER_HANDLE}` },
      { vmid: 'twitter:title', name: 'twitter:title', content: SITE_NAME },
      { vmid: 'twitter:image', name: 'twitter:image', content: '' }, // TODO: Add sharer image
      { vmid: 'twitter:description', name: 'twitter:description', content: SITE_DESCRIPTION },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, // TODO: Add apple-touch-icon
      { rel: 'canonical', href: SITE_URL },
      { rel: 'alternative', type: 'application/rss+xml', title: 'Audioxide // Feed', href: RSS_URL }
      // { rel: 'alternative', type: 'application/json+oembed', href: 'json oembed url' },
      // { rel: 'alternative', type: 'application/xml+oembed', href: 'xml oembed url' },
      // { rel: 'shortlink', type: 'text/html', href: 'shorturl' },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#f01d4f' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
