<template>
    <lead-review class="lead-post" v-if="post && post.categories.includes(2)" :post="post" />
</template>

<script lang="ts">
import Vue from 'vue';
import LeadReview from './LeadReview.vue';

export default Vue.extend({
    components: { LeadReview },
    computed: {
        post() {
            return this.$store.state.posts.posts[1];
        }
    }
})
</script>

<style lang="scss" scoped>
    .lead-post {
        border-radius: 15px;
        box-shadow: 0px 0px 10px 0px rgba(191,181,191,0.96);
    }
</style>