<template>
  <header>
    <site-header-nav-bar />
    <site-header-album-banner />
  </header>
</template>

<script>
import SiteHeaderNavBar from './SiteHeaderNavBar.vue';
import SiteHeaderAlbumBanner from './SiteHeaderAlbumBanner.vue';

export default {
  name: 'SiteHeader',
  components: { SiteHeaderNavBar, SiteHeaderAlbumBanner },
};
</script>

<style scoped lang="scss">
  @import '~assets/styles/variables.scss';

  header {
    padding-top: $site-nav__bar-height;
  }
</style>
