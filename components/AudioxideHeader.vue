<template>
  <header>
    <nav-bar />
    <album-banner />
  </header>
</template>

<script>
import NavBar from './NavBar.vue';
import AlbumBanner from './AlbumBanner.vue';

export default {
  name: 'AudioxideHeader',
  components: { NavBar, AlbumBanner },
};
</script>

<style scoped>

</style>
