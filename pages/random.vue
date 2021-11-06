<template>
    <main>
        <img src="@/assets/icons/brain.svg" class="random-icon"/>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { rand } from '~/assets/utilities';

export default Vue.extend({
    name: 'RandomPost',
    asyncData({ params: { type }, store }) {
        if (!('postTotal' in store.state.types)) {
            return store.dispatch('getTypes');
        }
        return Promise.resolve();
    },
    async created() {
        const totalPosts = this.$store.state.types.postTotal;
        const postInd = rand(0, totalPosts - 1);
        await this.$store.dispatch('posts/getIndexedPost', postInd);
        const post = this.$store.getters['posts/byIndex'][postInd];
        this.$router.replace(`/${post.metadata.type}/${post.metadata.slug}`);
    }
});
</script>

<style>
    @import "~assets/styles/animations.scss";

    .random-icon {
        width: 400px;
        margin: 80px auto;
        display: block;
        animation: 1s linear infinite both pulse;
    }
</style>