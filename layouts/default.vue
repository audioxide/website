<template>
  <div>
    <a class="skip-link" href="#main">Skip to main content</a>
    <site-header />
    <div id="main">
      <nuxt />
    </div>
    <site-footer />
  </div>
</template>

<script>
import Vue from 'vue'
import SiteHeader from '../components/layout/SiteHeader.vue'
import SiteFooter from '../components/layout/SiteFooter.vue'
import { SITE_URL } from '../assets/siteConstants'
import { padNum } from '../assets/utilities'

Vue.filter('unescape', (str) =>
  str.replace(/&#(\d+);/g, (dec) => String.fromCharCode(dec))
)
Vue.filter('formatDate', (date) => {
  let obj = date
  if (!(date instanceof Date)) {
    obj = new Date(date)
  }
  return `${padNum(obj.getDate())}.${padNum(
    obj.getMonth() + 1
  )}.0${obj.getFullYear()}`
})

export default {
  name: 'AudioxideApp',
  components: { SiteHeader, SiteFooter },
  head() {
    return {
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: SITE_URL + this.$route.path
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: SITE_URL + this.$route.path
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/reset';
@import '~assets/styles/fonts';
@import '~assets/styles/variables';

html,
body {
  font-size: 16px;
  scrollbar-width: thin;
  scrollbar-color: darkgrey white;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border: 1px lightgrey solid;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border: 0;
    outline: 0;
    border-radius: 1em;
  }
}

a {
  text-decoration: underline;
  color: $colour-pink;
  &:hover {
    color: lighten($colour-pink, 30%);
  }
}

p {
  line-height: 1.3;
}

.site-content {
  width: $site-content__width;
  margin: 0 auto;
}

@include medium {
  .site-content {
    width: $site-content__width--large;
  }

  .site-content--flex {
    display: flex;
    flex-wrap: wrap;
  }
}

@include large {
  .site-content {
    width: $site-content__width--x-large;
  }
}

.sr-only {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}

.collapsible__toggle {
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  &::-webkit-details-marker {
    display: none;
  }
}

.skip-link {
  position: absolute;
  left: -9999em;
}

.skip-link:focus {
  left: 0;
  z-index: 1; /* or larger if necessary */
}
</style>
