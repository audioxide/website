<script lang="ts">
import Vue from 'vue'
import Icon from '@/components/Icon.vue';

export default Vue.extend({
    name: 'RandomPost',
    asyncData({ params: { type }, store }) {
        if (!('pages' in store.state.types) || !('postTypes' in store.state.types)) {
            return store.dispatch('getTypes');
        }
        return Promise.resolve();
    },
    render: (h) => h(Icon, { props: { icon: 'brain' }, class: 'random-icon' }),
    async created() {
        const types = this.$store.state.types as { [key: string]: string[] };
        const slugs = types.postTypes;
        const typeInd = Math.floor(Math.random() * slugs.length);
        const typeSlug = slugs[typeInd];
        await this.$store.dispatch('posts/getPostType', typeSlug);
        const posts = this.$store.state.posts.posts[typeSlug];
        const postInd = Math.floor(Math.random() * posts.length);
        const post = posts[postInd];
        this.$router.replace(`${post.metadata.type}/${post.metadata.slug}`);
    }
});
</script>

<style>
    @keyframes pulse {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.25;
        }

        to {
            opacity: 1;
        }
    }

    .random-icon {
        font-size: 10em;
        margin: 40px auto;
        display: block;
        animation: 1s linear infinite both pulse;
    }
</style>