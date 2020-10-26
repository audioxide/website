<template functional>
    <div class="newsletter-signup-container" :class="data.staticClass || ''">
        <p>Get monthly roundups straight to your inbox. <a href="https://eepurl.com/cox6qr" target="_blank">Sign up for our newsletter.</a></p>
    </div>
</template>

<style lang="scss" scoped>

    @import "~assets/styles/variables";

    .newsletter-signup-container {
        font-family: $heading-fontstack;
        font-weight: bold;
        text-align: center;
        color: black;
        width: 95%;
        margin: auto;
        padding: 1em;
        border: $line-width solid $line-colour;
        border-radius: 15px;
    }

</style>