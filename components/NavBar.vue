<template>
    <nav class="site-nav" :class="{ 'active': !collapsed }">
        <!-- Menu/More link -->
        <span class="menu-toggle"
                aria-label="Toggle site menu"
                tabindex="0"
                @click="collapsed = !collapsed">
                {{ menuText }}
        </span>

        <!-- Search bar -->
        <search-bar class="search-bar" />

        <!-- Primary Nav -->
        <ul class="site-nav__listing">
            <li v-for="(item, key) in activenav"
                :key="key"
                class="site-nav__list-item site-nav__list-item--always-show">
                <nuxt-link :to="item.link.route" @click.native="collapsed = true">{{ item.link.text }}</nuxt-link>
                <ul v-if="!collapsed && 'children' in item" class="site-nav__listing--sub">
                <li v-for="(child, cKey) in item.children"
                    :key="cKey"
                    class="site-nav__list-item site-nav__list-item--sub">
                    <nuxt-link :to="child.route" @click.native="collapsed = true">{{ child.text }}</nuxt-link>
                </li>
                </ul>
            </li>
        </ul>

        <!-- Logo -->
        <nuxt-link to="/" class="site-nav__logo">
            <span class="site-nav__logo-text">Audioxide</span>
        </nuxt-link>

    </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '@/components/SearchBar.vue';

const nav = [
    {
        link: { text: 'Reviews', route: '/reviews' },
        children: [
            { text: 'Scoring System', route: '/scoring-system' },
            { text: 'The 27+ Club', route: '/tags/27-plus-club' }
        ],
    },
    {
        link: { text: 'Articles', route: '/articles' },
        children: [
            { text: 'Rankings', route: '/tags/rankings' },
            { text: 'The Music of Games', route: '/tags/the-music-of-games' },
            { text: 'Listening Parties', route: '/listening-parties'},
            { text: 'Funnyfarm', route: '/funnyfarm'}
        ]
    },
    { link: { text: 'Interviews', route: '/interviews' } },
];

type NavConfig = typeof nav;

export default Vue.extend({
    name: 'NavBar',
    components: { SearchBar },
    data: () => ({
        nav,
        cutoff: 3,
        collapsed: true,
    }),
    computed: {
        mininav(): NavConfig {
        return this.nav.slice(0, this.cutoff);
        },
        activenav(): NavConfig {
        return this.collapsed ? this.mininav : this.nav;
        },
        menuText(): String {
            const bp = this.$store.state.breakpoint;
            if (bp === 'base' || bp === 'small') {
                return 'Menu';
            }
            return this.collapsed ? 'More' : 'Close';
        }
    },
});
</script>

<style scoped lang="scss">
    @import '~assets/styles/variables.scss';

    .site-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        min-height: $site-nav__bar-height;
        background: black;
        color: white;
        padding: 1rem 0.5rem;
        a {
            color: white;
            text-decoration: none;
            &:hover {
                color: darken(white, 10%);
            }
        }
    }

    @include medium {
        .site-nav {
            padding: 1rem 5vw;
            display: flex;
            justify-content: flex-start;
            margin: 0 auto;
        }
    }

    @include large {
        .site-nav {
            padding: 1rem 15vw;
        }
    }

    .site-nav {
        color: white;
        font-family: $heading-fontstack;
        font-size: 1.3rem;
        z-index: 10;
    }

    @include medium {
        .menu-toggle, .search-bar {
            order: 1;
        }
    }

    .menu-wrap--active {
        background: black;
        padding-bottom: 1.3rem;
        margin-top: 2rem;
        .site-nav__listing {
            display: block;
        }
    }

    @include large {
        .menu-wrap--active {
            margin-top: 0;
        }
    }

    /* .site-nav {
        .menu-toggle, .site-nav__listing > .site-nav__list-item > a {
            transition: 0.25s color ease-in-out;
        }
    }

    @include medium {
        .site-nav:focus-within {
            .menu-toggle, .site-nav__listing > .site-nav__list-item > a {
                color: black;
            }
        }
    } */

    .menu-toggle {
        display: inline-block;
        margin-right: 2.5rem;
        position: relative;
        @include medium {
            .active & {
                // Audioxide logo width so no overlapping occurs
                margin-right: calc(2.5rem + 172px);
            }
        }
        &::after {
            content: '\25BC';
            font-size: 0.4em;
            line-height: 0.3em;
            transition: 0.5s transform ease-in-out;
            display: block;
            position: absolute;
            right: -1rem;
            top: 0.7rem;
        }
    }

    .site-nav__listing {
        display: none;
        & > .site-nav__list-item {
            margin-right: 2.5rem;
            margin-top: 1.5rem;
            min-width: 33vw;
            @include small {
                min-width: auto;
            }
            @include medium {
                margin-right: 1.5rem;
            }
            @include large {
                margin-right: 2.5rem;
            }
            &:last-child {
                margin-right: 0;
                @include medium {
                    margin-right: 2.5rem;
                }
            }
        }
        @include medium {
            display: flex;
            // margin-left: 5vw;
            & > .site-nav__list-item {
                margin-top: 0;
            }
        }
        @include large {
            // margin-left: 15vw;
        }
        .site-nav__listing--sub {
            display: none;
            flex-direction: column;
            margin-top: 1em;
        }
        .site-nav__list-item--sub {
            margin-top: .5em;
            font-size: 0.8em;
            a {
                color: $colour-grey--light;
                &:hover {
                    color: lighten($colour-grey--light, 30%);
                }
            }
        }
    }

    .site-nav.active {
        .menu-toggle {
            &::after {
                transform: rotate(180deg) translateY(1px);
            }
        }
        /* @include medium {
            &::after {
                display: block;
                background: black;
                content: '';
                height: 11vw;
                width: 100%;
                position: absolute;
                bottom: -11vw;
                z-index: -1;
                left: 0;
            }
        } */
        .site-nav__listing {
            display: flex;
            flex-wrap: wrap;
            @include small {
                justify-content: center;
            }
        }
        .site-nav__list-item {
            display: block;
        }
        .site-nav__listing--sub {
            display: flex;
        }
    }

    .search-bar {
        display: none;
        .site-nav.active & {
            display: block;
            margin-top: 1rem;
        }
        @include medium {
            margin-top: -0.3rem;
        }
    }

    @include medium {
        .search-bar {
            display: block;
            .site-nav.active & {
                display: none;
            }
        }
    }

    @import '~assets/styles/variables';

    .site-nav__logo {
        text-decoration: none;
        font-size: $site-nav__bar-font-size--x-small;
        @include small {
            font-size: $site-nav__bar-font-size--small;
        }
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        padding-right: calc(#{$site-nav__signet-size--small} + #{$site-nav__signet-gutter--small});
    }

    @include medium {
        .site-nav__logo {
            right: 5vw;
        }
    }
    @include large {
        .site-nav__logo {
            right: 15vw;
        }
    }
    .site-nav__logo-text {
        @include logo;
        position: relative;
        &:after {
            background-image: $logo-signet;
            background-size: cover;
            content: '\00a0';
            position: absolute;
            width: $site-nav__signet-size--small;
            height: $site-nav__signet-size--small;
            margin-left: $site-nav__signet-gutter--small;
            top: calc(
              (#{$site-nav__signet-size--small} - #{$site-nav__bar-font-size--small}) / 2 * -1
            );
        }
    }
</style>
