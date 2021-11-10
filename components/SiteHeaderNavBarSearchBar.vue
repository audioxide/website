<template>
  <div class="search-bar" :class="{ active: isActive }">
        <span class="input-wrapper">
            <span class="search-icon">
                <img src="@/assets/icons/magnifying-glass.svg" :class="{ loading: isLoading }" />
            </span>
            <input class="search-input"
                   type="text"
                   v-model="term"
                   placeholder="Search..."
                   ref="searchInput" />
        </span>
        <ul class="search-results" v-if="isActive && isEmpty">
            <li><ul class="listing"><li>No results found.</li></ul></li>
        </ul>
        <ul class="search-results" v-else-if="isActive">
            <li v-for="(listing, key) in results" :key="key"><span class="heading">{{ key }}</span>
                <ul class="listing" :class="{ pills: key === 'tags' }">
                    <li v-for="(item, listingKey) in listing" :key="listingKey">
                        <nuxt-link tabindex="0" :to="item.route">{{ item.title }}</nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import he from 'he';
import { search } from '~/api';
import { throttle } from '~/assets/utilities';

type Result = { title: string, route: string };
type Results = { [key: string]: Result[] };

const throttledSearch = throttle(async (ctx) => {
    const term = ctx.term;
    if (term.length > 0) {
        ctx.isLoading = true;
        ctx.results = await search(term);
        Object.values(ctx.results as Results).forEach(set => set.forEach(item => Vue.set(item, 'title', he.decode(item.title))));
        ctx.isLoading = false;
        return;
    }
    ctx.results = {};
}, 250);

export default Vue.extend({
    name: 'SiteHeaderNavBarSearchBar',
    data: () => ({ results: {}, term: '', isLoading: false }),
    created() {
        // Wait until after the route has loaded to defocus
        // Safari removes the listing too early so links don't fire
        this.$router.afterEach(() => this.unfocus());
    },
    computed: {
        isEmpty() {
            for (let key in this.results) {
                if (Object.prototype.hasOwnProperty.call(this.results, key)) return false;
            }
            return true;
        },
        isActive() {
            return this.term.length > 0;
        }
    },
    watch: {
        term() {
            throttledSearch(this);
        }
    },
    methods: {
        unfocus() {
            if (process.server) return;
            const elm = this.$refs.searchInput as HTMLElement;
            elm.focus();
            elm.blur();
        }
    }
})
</script>

<style lang="scss" scoped>
    @import '~assets/styles/variables.scss';

    .search-bar {
        background-color: white;
        color: #111;
        padding: 0 0.5em;
        margin: 0 auto;
        border-radius: 1em;
        font-family: $heading-fontstack;
        border: $colour-grey--lighter;
        position: relative;
        width: 100%;
        max-width: 500px;
        @include medium {
            margin: 0;
            width: 25vw;
            max-width: 100%;
        }
        &.active:focus-within {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }

    .input-wrapper {
        display: flex;
    }

    .search-icon {
        width: 20.8px;
        position: relative;
        margin-top: .3em;
    }

    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; } 
    } 

    .search-icon .loading {
        animation: pulse 2s both;
    }

    .search-input {
        padding: 0.5em 0;
        background-color: transparent;
        flex-grow: 2;
        margin-left: 0.5em;
    }

    .search-results {
        display: none;
    }

    .search-bar:focus-within .search-results {
        display: block;
    }

    .search-results {
        position: absolute;
        left: 0;
        background-color: white;
        font-size: 1rem;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
        max-height: 80vh;
        width: 100%;
        border: 2.5px solid $colour-grey--lighter;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: darkgrey transparent;
        &::-webkit-scrollbar {
            width: 7px;
        }
        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background-color: darkgrey;
            border: 0;
            outline: 0;
            border-radius:1em;
        }
    }

    .search-results .heading {
        display: block;
        background-color: $colour-grey--lighter;
        text-transform: uppercase;
        font-size: 0.9em;
        padding: 0.4em 0.5em;
    }

    .search-results .listing li {
        font-family: $heading-fontstack;
        padding: 0.7em 1em;
        // height: 2em;
        border-bottom: 1px solid $colour-grey--lighter;
        &:last-child {
            border-bottom: 0;
        }
    }

    .search-results .pills.listing {
        margin: 0.5em 0.5em 0;
    }

    .search-results .pills.listing li {
        @include tag;
    }
</style>