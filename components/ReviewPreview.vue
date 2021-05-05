<template>
    <portal to="global">
        <div class="wrapper" :style="{ top: `${top}px`, left: `${left}px`}">
            <h3>
                <span class="album">Debut</span>
                <span class="artist">Bjork</span>
            </h3>
            <p>‘Björk creates her own identity by combining seemingly contrasting genres and forming something entirely unique. This was the first sign of innovation in her career, breaking the mould of what it means to be a new, exciting artist.’</p>
            <p class="score">
                <span class="given">25</span>
                <span class="total">30</span>
            </p>
            <div class="img">
                <img src="https://picsum.photos/300/300" />
            </div>
        </div>
    </portal>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ReviewPreview",
    props: {
        slug: String,
        top: Number,
        left: Number
    },
    created() {
        console.log(this.slug, this.top, this.left);
    },
});
</script>

<style lang="scss" scoped>
@import "~assets/styles/variables";

.wrapper {
    position: absolute;
    background: white;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.6);
    border-radius: 0.5em;
    display: grid;
    max-width: 625px;
    overflow: hidden;
    padding: 20px 37px;
    font-family: $base-fontstack;
    margin: 0;
    flex-shrink: 1;
    h3, .score {
        font-family: $heading-fontstack;
        font-weight: 500;
        font-size: 1.4em;
    }
    h3 {
        margin-bottom: $site-content__spacer--large;
        span {
            display: block;
            &.album  {
                font-style: italic;
            }
        }
    }
    p {
        @include site-content__body-text;
    }
}

.img {
    flex-shrink: 0;
    width: 300px;
    img {
        width: 70%;
    }
    &::before {
        content: '';
        background-image: 'https://picsum.photos/300/300';
        filter: blur(10px) contrast(1.5);
    }
}
</style>