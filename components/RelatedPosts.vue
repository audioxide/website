<template>
    <section class="related-posts">
        <h3>Related posts</h3>
        <div class="listing">
            <any-post-link v-for="(post, key) in posts"
                           :key="key"
                           :post="post"
                           :author="false"
                           image-format="square"
                           class="post-item" />
        </div>
    </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import AnyPostLink from '@/components/AnyPostLink.vue';

export default Vue.extend({
    name: 'RelatedPosts',
    components: { AnyPostLink },
    props: {
        posts: { type: Array as PropType<PostListing<Post>>, required: true },
    },
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.related-posts {
    padding-top: 30px;
}

h3 {
    @include section-heading;
}

.listing .post-item {
    display: flex;
    ::v-deep {
        @include postLinkFlex;
    }
}

@include small {
    .listing {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .post-item {
            width: calc(50% - 1em);
            display: block;
            ::v-deep {
                .img-wrap {
                    margin-right: 0;
                }
            }
        }
    }
}

@include medium {
    .listing .post-item {
        width: calc(25% - 1em);
        ::v-deep {
            h4 {
                font-size: 1.1em;
            }
            p {
                font-size: 1em;
            }
        }
    }
}
</style>