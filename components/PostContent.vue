<template>
    <span class="content" :class="{ decorate }" v-html="content" ref="contentParent" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

type PartialEvent = { preventDefault: Event['preventDefault'], target: Event['target'] };

export default Vue.extend({
    name: 'PostContent',
    props: {
        content: { type: String, required: true },
        decorate: { type: Boolean, default: false },
    },
    data: () => ({
        handler: null as ((evt: PartialEvent) => void) | null,
    }),
    mounted() {
        const parent = this.$refs.contentParent;
        let preventDefault: PartialEvent['preventDefault'];
        this.handler = (evt: PartialEvent) => {
            preventDefault = preventDefault || evt.preventDefault.bind(evt);
            const elm = evt.target;
            if (!(elm instanceof Element)) return;
            if (elm.nodeName !== 'A') {
                if (parent === elm.parentNode || !this.handler) return;
                this.handler({ preventDefault, target: elm.parentNode });
                return;
            }
            const url = (elm as HTMLAnchorElement).href;
            let host, pathname;
            if (window.URL && window.URL.prototype && ('href' in window.URL.prototype)) {
                ({host, pathname} = new URL(url));
            } else {
                // No version of IE supports an instance of URL
                const uriRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
                const result = url.match(uriRegex);
                if (!result) return;
                host = result[4];
                pathname = result[5];
            }
            if (host === window.location.host) {
                evt.preventDefault();
                this.$router.push(pathname);
            }
        };

        if (parent instanceof Element) {
            parent.addEventListener('click', this.handler, false);
        }
    },
    beforeDestroy() {
        const parent = this.$refs.contentParent;
        if (this.handler && parent instanceof Element) {
            parent.removeEventListener('click', this.handler);
        }
    },
})
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .content {
        margin: $site-content__spacer--large 0;
        font-family: $base-fontstack;
        & ::v-deep {
            p {
                @include site-content__body-text;
                margin: 0 auto;
            }

            strong {
                font-weight: 600;
            }

            em {
                font-style: italic;
            }

            h2, h3, h4 {
                font-family: $heading-fontstack;
                font-weight: bold;
                margin: $site-content__spacer--x-large auto 0;
            }
            h2 + h3, h3 + h4 {
                margin-top: $site-content__spacer--small;
            }
            h4 {
                font-size: $site-content__font--large;
                margin-bottom: $site-content__spacer--x-large;
            }
            img {
                width: 100%;
                height: auto;
            }
            blockquote {
                margin: 0 auto;
                border-left: 5px solid $colour-grey--light;
                padding-left: 20px;
            }
            p, blockquote {
                & + p, & + blockquote, & + h2, & + h3, & + h4 {
                    margin-top: $site-content__spacer--x-large;
                }
            }
        }
        &:after {
            content: "";
            display: table;
            clear: both;
        }
    }

    .decorate.content ::v-deep {
        & > {
            p, img, h2, h3, h4, blockquote {
                width: 67%;
            }
        }
        & > p:first-of-type:first-letter {
            font-size: $site-content__font--xx-large;
            float: left;
            line-height: 0.85em;
        }
        /* & > p, & > img, & > h2, & > h3, & > blockquote {
            width: 67%;
        } */
        & .pull-right {
            float: right;
            margin-right: -25%;
        }
        & .pull-left {
            float: left;
            margin-left: -25%;
        }
    }
</style>