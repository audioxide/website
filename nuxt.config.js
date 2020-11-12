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
    title: 'Audioxide',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#121212'},
      { name: 'theme-color', content: '#121212' },
      { name: 'monetization', content: '$ilp.uphold.com/G7U2HWjBghge' },
      { name: 'fb:app_id', content: '950609285023482' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { property: 'og:site_name', content: 'Audioxide' },
      { property: 'og:url', content: 'https://audioxide.com/' },
      { property: 'og:image', content: '' }, // TODO: Add sharer image
      { property: 'og:image:secure_url', content: '' }, // TODO: Add sharer image
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Audioxide' },
      { property: 'og:description', content: '' }, // TODO: Canonicalise meta description
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@audioxide' },
      { name: 'twitter:title', content: 'Audioxide' },
      { name: 'twitter:image', content: '' }, // TODO: Add sharer image
      { name: 'twitter:description', content: '' }, // TODO: Canonicalise meta description
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, // TODO: Add apple-touch-icon
      { rel: 'canonical', href: 'https://audioxide.com' },
      { rel: 'alternative', type: 'application/rss+xml', title: 'Audioxide // Feed', href: 'https://audioxide.com/feed/' }
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
