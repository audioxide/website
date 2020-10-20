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
        <label class="site-nav__search" aria-label="Search site">
            <input class="site-nav__search-input" type="text" placeholder="Search..." />
            <icon icon="search" class="search-icon" />
        </label>

        <!-- Primary Nav -->
        <ul class="site-nav__listing">
            <li v-for="(item, key) in activenav"
                :key="key"
                class="site-nav__list-item site-nav__list-item--always-show">
                <nuxt-link :to="item.link.route">{{ item.link.text }}</nuxt-link>
                <ul v-if="!collapsed && 'children' in item" class="site-nav__listing--sub">
                <li v-for="(child, cKey) in item.children"
                    :key="cKey"
                    class="site-nav__list-item site-nav__list-item--sub">
                    <nuxt-link :to="child.route">{{ child.text }}</nuxt-link>
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

<script>
const nav = [
    {
        link: { text: 'Reviews', route: '/reviews' },
        children: [
            { text: '27 Club', route: '/27-club' },
            { text: 'Scoring', route: '/scoring' },
            { text: 'Stats', route: '/stats' },
        ],
    },
    {
        link: { text: 'Articles', route: '/articles' },
        children: [
            { text: 'Game Music', route: '/game-music' },
            { text: 'Rankings', route: '/rankings' }
        ]
    },
    { link: { text: 'Interviews', route: '/interviews' } },
    { link: { text: 'About', route: '/about' } },
    { link: { text: 'Contact', route: '/contact' } },
];

export default {
  name: 'NavBar',
  data: () => ({
    nav,
    cutoff: 3,
    collapsed: true,
  }),
  computed: {
    mininav() {
      return this.nav.slice(0, this.cutoff);
    },
    activenav() {
      return this.collapsed ? this.mininav : this.nav;
    },
    menuText() {
        const bp = this.$store.state.breakpoint;
        if (bp === 'base' || bp === 'small') {
            return 'Menu';
        }
        return this.collapsed ? 'More' : 'Close';
    }
  },
};
</script>

<style scoped lang="scss">
    @import '~assets/styles/variables.scss';

    $nav-vertical-padding: $site-nav__bar-height--small - $site-nav__bar-font-size--small / 2;
    .site-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        min-height: 56px;
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
            // height: $site-nav__bar-height--small;
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
        .menu-toggle, .site-nav__search {
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
        display: block;
        margin-right: 2.5rem;
        position: relative;
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

    .site-nav__search {
        display: none;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;
        margin-top: 1.5rem;
        margin-bottom: 0;
        height: 2rem;
        min-width: 0;
        .site-nav.active & {
            display: flex;
            align-self: baseline;
        }
        @include medium {
            display: flex;
            justify-content: flex-end;
            margin-top: -0.3rem;
            &:focus-within {
                transition: 0.5s min-width ease-in-out;
                min-width: calc(100% - (170px + 10vw + 1rem));
                position: absolute;
                z-index: 2;
                left: 5vw;

            }
        }
        @include large {
            &:focus-within {
                min-width: calc(100% - (170px + 30vw + 1rem));
                left: 15vw;
            }
        }
    }

    .site-nav__search::before {
        background: white;
        color: black;
        padding: 0.5rem;
        border-radius: 1rem;
        position: relative;
        z-index: 1;
    }

    .site-nav__search-input {
        background-color: transparent;
        border: none;
        border-radius: 1rem;
        padding: 0.5rem;
        padding-left: 2.2rem;
        margin-left: -2.2rem;
        background-color: white;
        width: 100%;
        max-width: 500px;
        & + .search-icon {
            color: black;
        }
        @include medium {
            background-color: transparent;
            max-width: 0;
            & + .search-icon {
                color: white;
                transition: 0.25s color ease-in-out;
            }
            &:focus {
                transition: 0.5s max-width ease-in-out, 0.25s background-color ease-in-out;
                background-color: white;
                max-width: calc(100% - (170px + 10vw));
                & + .search-icon {
                    color: black;
                }
            }
        }
    }

    .site-nav__search .search-icon {
        margin-left: 0.8rem;
        margin-right: 0.3rem;
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
