<template functional>
  <div class="newsletter-signup-container" :class="data.staticClass || ''">
    <span>Receive monthly roundups of what we’ve been up to. <a href="https://audioxide.eo.page/newsletter">Sign up for our newsletter ➔</a></span>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.newsletter-signup-container {
  font-family: $heading-fontstack;
  font-weight: bold;
  text-align: center;
  color: black;
  width: 100%;
  margin: auto;
  padding: 1em;
  border: $line-width solid $line-colour;
  border-radius: 15px;
}

span {
  padding: 10px 0;
}

</style>
