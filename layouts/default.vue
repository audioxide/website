<template>
  <div>
    <audioxide-header />
    <nuxt />
    <audioxide-footer />
  </div>
</template>

<script>
import AudioxideHeader from '../components/AudioxideHeader.vue';
import AudioxideFooter from '../components/AudioxideFooter.vue';

export default {
  name: 'AudioxideApp',
  components: { AudioxideHeader, AudioxideFooter },
};
</script>

<style lang="scss">
  @import '~assets/styles/reset';
  @import '~assets/styles/variables';
</style>

<style lang="scss">
  @import "~assets/styles/variables";

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
</style>