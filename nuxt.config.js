const fs = require('fs');
const path = require('path');
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const CopyPlugin = require("copy-webpack-plugin");

const {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  RSS_URL,
} = require('./assets/siteConstants');

const routes = fs.existsSync('./routes.json') ? JSON.parse(fs.readFileSync('./routes.json')) : [];

const routeDepth = (urlPath) => urlPath.replace(/[^/]+/g, '').length;

const routePriority = (urlPath) => {
  if (urlPath === '/') return 1;
  const depth = routeDepth(urlPath);
  // Posts are two levels deep and more important than listings and pages
  let priority = 1 - (1 - depth * 0.4);
  // Reviews get a priority boost
  if (urlPath.startsWith('/reviews')) {
    priority += 0.1;
  }
  // Ensure priorities stay within bounds
  return Math.max(priority, 0.1);
};

const routeChangeFrequency = (urlPath) => {
  // The homepage may change several times a week
  if (urlPath === '/') return 'daily';
  const depth = routeDepth(urlPath);
  switch (depth) {
    case 1:
      // Listings likely change each week
      return 'weekly';
    case 2:
      // Once a post is published we don't expect it to change
      return 'never';
  }
};

export default {
  target: 'static',
  ssr: false,
  modern: 'client',
  generate: { routes },
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
      { name: 'msapplication-TileImage', content: `${SITE_URL}/ms-icon-144x144.png` },
      { name: 'theme-color', content: '#121212' },
      { name: 'monetization', content: '$ilp.uphold.com/G7U2HWjBghge' },
      { name: 'fb:app_id', content: '950609285023482' },
      { property: 'og:site_name', content: SITE_NAME },
      // All entries below are changed by other components
      { hid: 'description', name: 'description', content: SITE_DESCRIPTION },
      { hid: 'og:url', property: 'og:url', content: `${SITE_URL}/` },
      { hid: 'og:image-standard', property: 'og:image', content: `${SITE_URL}/social-tile-3-2.png` },
      { hid: 'og:image-standard:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:image-standard:width', property: 'og:image:width', content: '1200' },
      { hid: 'og:image-standard:height', property: 'og:image:height', content: '800' },
      { hid: 'og:image-standard:alt', property: 'og:image:alt', content: 'Audioxide branded social tile' },
      { hid: 'og:image-square', property: 'og:image', content: `${SITE_URL}/social-tile-1-1.png` },
      { hid: 'og:image-square:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:image-square:width', property: 'og:image:width', content: '600' },
      { hid: 'og:image-square:height', property: 'og:image:height', content: '600' },
      { hid: 'og:image-square:alt', property: 'og:image:alt', content: 'Audioxide branded social tile' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: SITE_NAME },
      { hid: 'og:description', property: 'og:description', content: SITE_DESCRIPTION },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: `@${TWITTER_HANDLE}` },
      { hid: 'twitter:title', name: 'twitter:title', content: SITE_NAME },
      { hid: 'twitter:image', name: 'twitter:image', content: `${SITE_URL}/social-tile-2-1.png` },
      { hid: 'twitter:description', name: 'twitter:description', content: SITE_DESCRIPTION },
    ],
    link: [
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '192x192',  href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'apple-touch-icon', sizes:'57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes:'60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes:'72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes:'76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes:'114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes:'120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes:'144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes:'152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes:'180x180', href: '/apple-icon-180x180.png' },
      { rel: 'alternative', type: 'application/rss+xml', title: 'Audioxide // Feed', href: RSS_URL }
      // { rel: 'alternative', type: 'application/json+oembed', href: 'json oembed url' },
      // { rel: 'alternative', type: 'application/xml+oembed', href: 'xml oembed url' },
      // { rel: 'shortlink', type: 'text/html', href: 'shorturl' },
    ],
    script: [
      { "data-goatcounter": "https://audioxide.goatcounter.com/count", async: true, src: "//gc.zgo.at/count.js" },
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
  plugins: [
    { src: '~plugins/goatcounter.js', mode: 'client' }
  ],
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
    extend(config, ctx) {},
    plugins: [
      new SitemapPlugin({
        base: SITE_URL,
        paths: routes.map(urlPath => ({
          path: urlPath,
          lastMod: true,
          priority: routePriority(urlPath),
          changefreq: routeChangeFrequency(urlPath),
        })),
      })
    ]
  }
}
