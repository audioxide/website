<template>
    <post-listing :posts="posts" :type="typeTitle.toLowerCase()" />
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';
import PostListing from '@/components/PostListing.vue';
import { audioxideStructuredData, generateBreadcrumbs, metaTitle } from '~/assets/utilities';

const type = 'listening-parties';
const typeTitle = 'Listening parties'

export default Vue.extend({
    name: 'ListeningPartiesListing',
    components: { PostListing },
    head() {
        const title = metaTitle(typeTitle);
        return {
            title,
            link: [
                {
                    rel: 'alternative',
                    type: 'application/rss+xml',
                    title,
                    href: `https://audioxide.com/feed/${type}/`,
                },
            ],
            script: [
                {
                    type: 'application/ld+json',
                    json: {
                        '@context': 'http://schema.org',
                        '@type': 'CollectionPage',
                        name: typeTitle,
                        "speakable": {
                            "@type": "SpeakableSpecification",
                            "cssSelector": [".post-listing h2", ".post-link .info"]
                        },
                        publisher: audioxideStructuredData(),
                        breadcrumb: generateBreadcrumbs(this.$route),
                    }
                },
            ]
        };
    },
    data: () => ({ typeTitle }),
    asyncData({ store }) {
        return store.dispatch('posts/getPostType', type);
    },
    computed: {
        posts(): PostListing<Article> {
            return this.$store.state.posts.posts[type];
        },
    },
});
</script>
