<script lang="ts">
import { isObject } from '~/assets/utilities';
import DefaultPostTemplate from '../_type/_slug.vue';

const type = 'listening-parties';

export default DefaultPostTemplate.extend({
    name: 'AudioxideListeningParty',
    data: () => ({ type }),
    asyncData({ params: { slug }, store }) {
        return store.dispatch('posts/getPost', { type, slug });
    },
    created() {
        this.slug = this.$route.params.slug;
        const articleData = this.$store.getters['posts/pathLookup'][`${type}/${this.slug}`];
        if (isObject(articleData)) {
            this.article = articleData as Article;
        }
    }
});
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .article-content ::v-deep .content > h2 ~ p:first-of-type::first-letter {
        font-size: inherit;
        float: none;
        line-height: inherit;
    }

    .article-content ::v-deep .content > h2 {
        text-align: center;
        padding-top: $site-content__spacer--x-large;
    }

    .article-content ::v-deep .content p.speaker-name {
        font-family: $listening-party__speaker-name-font;
        font-size: $listening-party__speaker-name-size;
    }

    .article-content ::v-deep .content p.message {
        width: $listening-party__message-width;
        @include small {
            width: $listening-party__message-width--small;
        }
        @include medium {
            width: $listening-party__message-width--medium;
        }
        @include large {
            width: $listening-party__message-width--large;
        }
        padding: $listening-party__message-vertical-padding $listening-party__message-horizontal-padding;
        border-radius: $listening-party__message-curve;
        font-family: $listening-party__message-font;
    }

    .article-content ::v-deep .content p.message.speaker-0 {
        background: $listening-party__message-background--speaker0;
        color: $listening-party__message-colour--speaker0;
        margin-left: $listening-party__message-margin;
        @include medium {
            margin-left: $listening-party__message-margin--medium;
        }
        a {
            color: $listening-party__message-link-colour--speaker0;
            &:hover, &:focus, &:active {
                color: $listening-party__message-link-hover-colour--speaker0;
            }
        }
    }

    .article-content ::v-deep .content p.speaker-name + p.message {
        margin-top: 0;
    }

    .article-content ::v-deep .content p.speaker-name.speaker-0 {
        padding-left: $listening-party__message-horizontal-padding;
    }

    .article-content ::v-deep .content p.speaker-name.speaker-1 {
        text-align: right;
        padding-right: $listening-party__message-horizontal-padding;
    }

    .article-content ::v-deep .content p.message.speaker-1 {
        background: $listening-party__message-background--speaker1;
        color: $listening-party__message-colour--speaker1;
        margin-right: $listening-party__message-margin;
        @include medium {
            margin-right: $listening-party__message-margin--medium;
        }
        a {
            color: $listening-party__message-link-colour--speaker1;
            &:hover, &:focus, &:active {
                color: $listening-party__message-link-hover-colour--speaker1;
            }
        }
    }

    .article-content ::v-deep .content p.message + p.message {
        margin-top: -1em;
        padding-top: 1.25em;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
