<template>
    <main class="site-content site-content--flex" v-if="post.metadata">
        <header class="post-header">
            <slot name="header" :post="post">
                <h1 class="post-header__heading">{{ post.metadata.title | unescape }}</h1>
            </slot>
        </header>
        <section class="post-content">
            <slot :post="post">
                <post-content-block :content="post.content" :decorate="true" />
            </slot>
        </section>
    </main>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import PostContentBlock from './PostContentBlock.vue';

export default Vue.extend({
    name: 'PostSingle',
    components: { PostContentBlock },
    props: {
        post: { type: Object as PropType<Post>, required: true },
    },
})
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .post-header {
        padding-bottom: $site-content__spacer--small;
    }

    @include medium {
        .post-header {
            width: 100%;
        }
    }

    .post-header__heading {
        font-family: $heading-fontstack;
        font-size: $site-content__font--x-large;
        margin-bottom: $site-content__spacer;
        width: 75%;
        margin: auto;
        margin-top: 1em;
        text-align: center;
    }

    .post-content {
        margin-top: $site-content__spacer--large;
    }
</style>
