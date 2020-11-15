<template>
  <div>
    <audioxide-header />
    <nuxt />
    <audioxide-footer />
  </div>
</template>

<script>
import Vue from 'vue';
import AudioxideHeader from '../components/AudioxideHeader.vue';
import AudioxideFooter from '../components/AudioxideFooter.vue';
import { SITE_URL } from '../assets/siteConstants';
import { padNum } from '../assets/utilities';

Vue.filter('unescape', str => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)));
Vue.filter('formatDate', date => {
  let obj = date;
  if (!(date instanceof Date)) {
    obj = new Date(date);
  }
  return `${padNum(obj.getDate())}.${padNum(obj.getMonth() + 1)}.0${obj.getFullYear()}`;
});

export default {
  name: 'AudioxideApp',
  components: { AudioxideHeader, AudioxideFooter },
  head() {
      return {
        meta: [
          { hid:"og:url", property: "og:url", content: SITE_URL + this.$route.path },
        ]
      }
    }
}
</script>

<style lang="scss">
  @import '~assets/styles/reset';
  @import '~assets/styles/variables';
  @import '~assets/webfonts/allroundgothic_medium_macroman/stylesheet.css';
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;1,400;1,600&family=Spectral+SC:ital,wght@0,500;1,500&family=Spectral:ital,wght@0,200;0,400;0,600;1,200;1,400;1,600&display=swap');

  html, body {
    font-size: 16px;
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
    &:hover, &:focus {
      text-decoration: underline;
    }
    &::-webkit-details-marker {
      display: none;
    }
  }
</style>