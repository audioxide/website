<template>
    <article :class="{ 'decorated': decorate }">
        <section v-for="(item, key) in content" :key="key">
            <h2 class="author" v-if="authorName[key]">{{authorName[key]}}</h2>
            <p class="author-social" v-if="authorLink[key]"><a :href="authorLink[key].url">{{ authorLink[key].text }}</a></p>
            <span class="content" v-html="contentHTML[key]" />
            <p class="score" v-if="item.score">
                <span class="given" :style="textHighlight">{{item.score.score}}</span>
                <span class="sr-only">out of</span>
                <span class="possible">{{item.score.max}}</span>
            </p>
            <div class="track-wrapper" v-if="item.tracks">
                <span class="track-prefix">Favourite tracks //</span>
                <span class="tracks">
                    <span class="track"
                        v-for="(track, tkey) in item.tracks"
                        :key="`tracks-${tkey}`">
                        {{track}}
                    </span>
                </span>
            </div>
            <hr class="divider" v-if="key !== content.length - 1">
        </section>
    </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { isObject, resolveAuthorLink } from '~/assets/utilities';

type AuthorLink = {
    text: string,
    url: string,
};

export default Vue.extend({
    name: 'PostContent',
    props: {
        content: { type: Array as PropType<Post['content']>, required: true },
        colours: Array as unknown as PropType<ReviewMetadata['colours']>,
        decorate: { type: Boolean, default: false },
    },
    /* data: () => ({
        review: {} as {
            meta: {
                'Post Colours': PostColours,
                'Week Number': string,
            },
            reviews: {
                reviewer: {
                    name: string,
                }
            }[],
        },
    }), */
    computed: {
        textHighlight(): ({ color: string }) {
            const primary = isObject(this.colours) ? this.colours[0] : 'black';
            return { color: primary };
        },
        authors(): (Author | undefined)[] {
            return this.content.map(item => {
                if (!isObject(item) || !('author' in item)) return undefined;
                return (item as ReviewItem).author;
            })
        },
        authorName(): (string | null)[] {
            return this.authors.map(item => item ? item.name : null);
        },
        authorLink(): (AuthorLink | null)[] {
            return this.authors.map(author => resolveAuthorLink(author));
        },
        contentHTML(): string[] {
            return this.content.map(item => {
                if (typeof item === 'string') return item;
                if (isObject(item)) {
                    return (item as ReviewItem).review || item.content || item.body || '';
                }
                return '';
            });
        }
    }
})
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .author,
    .author-social,
    .score {
        font-family: $heading-fontstack;
    }

    .author {
        font-weight: bold;
        font-size: $site-content__font--large;
    }

    .author-social {
        @include site-content__subtext;
        margin-bottom: $site-content__spacer--small;
    }

    .content {
        margin: $site-content__spacer--large 0;
        font-family: $base-fontstack;
        & ::v-deep {
            p {
                @include site-content__body-text;
                margin: 0 auto;
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

    .decorated .content ::v-deep {
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

    .track-wrapper {
        display: flex;
    }

    .track-prefix, .track {
        @include site-content__body-text;
        margin: 0;
    }

    .track {
        display: block;
    }

    .track-prefix {
        font-weight: bold;
        margin-right: 0.25em;
    }

    .track:nth-child(2) {
        margin-left: 35px;
    }

    .track:nth-child(3) {
        margin-left: 70px;
    }

    .score {
        @include score-wrap;
        align-items: center;
        float: right;
        font-size: 1.7em;
        width: 82px;
        height: 82px;
        border: 2.5px $colour-grey--light solid;
        border-radius: 2em;
    }

    .given {
        @include review__score-given;
    }

    .possible {
        @include review__score-possible;
    }

    .divider {
        width: 75%;
    }

</style>