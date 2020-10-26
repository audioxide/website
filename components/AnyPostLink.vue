<script lang="ts">
import Vue, { VNode } from 'vue';
import PostLink from '@/components/PostLink.vue';
import ArticleLink from '@/components/ArticleLink.vue';
import ReviewLink from '@/components/ReviewLink.vue';

const ALBUM_TYPES = ['reviews'];

export default PostLink.extend({
    name: 'AnyPostLink',
    render(h): VNode {
        const opts = { props: this.$props };
        const type = this.post.metadata.type;
        return ALBUM_TYPES.includes(type) ? h(ReviewLink, opts) : h(ArticleLink, opts);
    },
});
</script>
