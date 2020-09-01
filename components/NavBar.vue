<template>
    <nav class="site-nav">

        <span
                class="burger-toggle__label burger-toggle__label--mobile-only burger-toggle--large"
                aria-label="Toggle site menu"
                tabindex="0"
                data-site-nav-toggle>
                <span class="burger-toggle__menu-bars"></span>
        </span>

        <div class="menu-wrap"
             :class="{
                'menu-wrap--active': !collapsed,
                'site-nav__menu-wrap--active': !collapsed
              }">
            <!-- Search bar -->
            <form>

            </form>
            <label class="site-nav__search" aria-label="Search site">
                <input class="site-nav__search-input" type="text" />
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
                <li @click="collapsed = !collapsed">
                    More
                </li>
            </ul>

            <hr class="site-nav__divider" />
        </div>

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
  },
};
</script>

<style scoped lang="scss">
    @import '~assets/styles/variables.scss';

    $nav-vertical-padding: $site-nav__bar-height--small - $site-nav__bar-font-size--small / 2;
    .site-nav {
        background: black;
        height: $site-nav__bar-height--small;
        color: white;
        padding: $nav-vertical-padding 0.5rem;
    }

    @include medium {
        .site-nav {
            padding: 1.3rem 0 0;
        }
    }

    .menu-wrap {
        transition: 0.5s transform ease-in-out;
        position: absolute;
        width: $site-nav__menu-width--small;
        height: 100vh;
        background: white;
        transform: translateX(-100%);
        border-right: 1px solid black;
        z-index: 1;
        top: 0;
        left: 0;
        padding: $site-nav__margin--small;
        color: black;
    }

    .menu-wrap--active {
        transform: none;
    }

    @include medium {
        .menu-wrap {
            transform: none;
            background: none;
            position: relative;
            width: auto;
            height: auto;
            border: none;
            display: flex;
            justify-content: flex-end;
            color: white;
            flex-direction: row-reverse;
            padding: 0;
        }

        .menu-wrap--active {
            background: black;
            padding-bottom: 1.3rem;
            margin-top: 2rem;
        }
    }

    @include large {
        .menu-wrap--active {
            margin-top: 0;
        }
    }

    .site-nav__search {
        display: block;
        margin-bottom: $site-nav__margin--small;
    }


    .site-nav__search::before {
        @include icon;
        font-family: "Font Awesome 5 Pro";
        font-weight: 400;
        content: '\f002';
    }

    @include medium {
        .site-nav__search {
            margin-bottom: 0;
            margin-top: -0.3rem;
        }

        .site-nav__search::before {
            background: white;
            color: black;
            padding: 0.5rem;
            border-radius: 1rem;
            position: relative;
            z-index: 1;
        }
    }

    .site-nav__search-input {
        border-bottom: 1px solid #dedede;
        width: calc(100% - 22px);
        &:focus {
            border-bottom-color: black;
        }
    }

    @include medium {
        .site-nav__search-input {
            width: 0;
            background: transparent;
            border: none;
            border-radius: 1rem;
            transition: 0.5s width ease-in-out, 0.5s background ease-in-out;
            padding: 0.5rem;
            padding-left: 2.2rem;
            margin-left: -2.2rem;
            &:focus {
                background: white;
                width: 10vw;
            }
        }
    }
</style>

<style lang="scss" scoped>
    /*.site-nav {
    background: black;
    height: var(--site-nav__bar-height--small);
    color: white;
    padding: calc((var(--site-nav__bar-height--small) - var(--site-nav__bar-
    font-size--small)) / 2) 0.5rem;
}*/

    /*@media (--bigger-than-medium-viewport) {
        .site-nav {
            padding: 0;
            padding-top: 1.3rem;
        }
    }*/

    /*.site-nav__menu-wrap {
        transition: 0.5s transform ease-in-out;
        position: absolute;
        width: var(--site-nav__menu-width--small);
        height: 100vh;
        background: white;
        transform: translateX(-100%);
        !*transform: translateX(calc(var(--site-nav__menu-width--small) * -1));*!
        border-right: 1px solid black;
        z-index: 1;
        top: 0;
        left: 0;
        padding: var(--site-nav__margin--small);
        color: black;
    }*/

    /*.site-nav__menu-wrap--active {
        transform: none;
    }*/

    /*@media (--bigger-than-medium-viewport) {
        .site-nav__menu-wrap {
            transform: none;
            background: none;
            position: relative;
            width: auto;
            height: auto;
            border: none;
            display: flex;
            justify-content: flex-end;
            color: white;
            flex-direction: row-reverse;
            padding: 0;
        }

        .site-nav__menu-wrap--active {
            background: black;
            padding-bottom: 1.3rem;
            margin-top: 2rem;
        }
    }

    @media (--bigger-than-large-viewport) {
        .site-nav__menu-wrap--active {
            margin-top: 0;
        }
    }*/

    @import '~assets/styles/variables';

    .site-nav__search {
        display: block;
        margin-bottom: var(--site-nav__margin--small);
    }


    .site-nav__search::before {
        @include icon;
        font-family: "Font Awesome 5 Pro";
        font-weight: 400;
        content: '\f002';
    }

    @include medium {
        .site-nav__search {
            margin-bottom: 0;
            margin-top: -0.3rem;
        }

        .site-nav__search::before {
            background: white;
            color: black;
            padding: 0.5rem;
            border-radius: 1rem;
            position: relative;
            z-index: 1;
        }
    }

    .site-nav__search-input {
        border-bottom: 1px solid #dedede;
        width: calc(100% - 22px);
        &:focus {
            border-bottom-color: black;
        }
    }

    @include medium {
        .site-nav__search-input {
            width: 0;
            background: transparent;
            border: none;
            border-radius: 1rem;
            transition: 0.5s width ease-in-out, 0.5s background ease-in-out;
            padding: 0.5rem;
            padding-left: 2.2rem;
            margin-left: -2.2rem;
            &:focus {
                background: white;
                width: 10vw;
            }
        }
    }

    .site-nav__divider {
        display: block;
        width: 100%;
        border-width: 0;
        border-top-width: 3px;
    }

    @include medium {
        .site-nav__divider {
            display: none;
            margin: 0;
        }
    }

    .site-nav__list-item {
        margin: $site-nav__margin--small 0;
        font-family: $heading-fontstack;
        font-size: 1.3rem;
        & > * {
            text-decoration: none;
        }
    }

    .site-nav__list-item--sub {
        color: #8e8e8e;
    }

    .site-nav__list-item--desktop-only {
        display: none;
    }

    @include medium {
        .site-nav__listing:not(.site-nav__listing--sub) {
            display: flex;
            padding-left: $site-nav__bar-margin--large;
        }

        .site-nav__list-item:not(.site-nav__list-item--sub) {
            display: inline;
            margin: 0;
            margin-right: 2.5rem;
            &:not(.site-nav__list-item--always-show) {
                display: none;
            }
        }

        .site-nav__list-item--sub {
            margin: 0.5rem 0;
            font-size: 1.1rem;
        }

        .site-nav__menu-wrap--active {
            & .site-nav__listing {
                & .site-nav__list-item:not(.site-nav__list-item--always-show) {
                    display: inline;
                }
                & .site-nav__listing--sub, & .site-nav__list-item.site-nav__list-item--sub,
                & .site-nav__list-item:not(.site-nav__list-item--sub) {
                    display: block;
                }
            }
        }

        .site-nav__listing--sub {
            display: none;
            margin-top: 1rem;
        }

        .site-nav__list-item--desktop-only {
            display: initial;
        }
    }

    @include large {
        .site-nav__listing:not(.site-nav__listing--sub) {
            padding-left: $site-nav__bar-margin--x-large;
        }
    }

    .site-nav__logo {
        text-decoration: none;
        font-size: $site-nav__bar-font-size--small;
        float: right;
        padding-right: calc(#{$site-nav__signet-size--small} + #{$site-nav__signet-gutter--small});
    }

    @include medium {
        .site-nav__logo {
            position: absolute;
            z-index: 2;
            top: 1rem;
            right: $site-nav__bar-margin--large;
            background: black;
            padding: 0 1rem 1rem;
        }
    }

    @include large {
        .site-nav__logo {
            right: $site-nav__bar-margin--x-large;
            padding: 0 1.5rem 1rem;
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

    @include medium {
        .site-nav__logo-text {
            &:before {
                background-image: $logo-wave;
                background-size: cover;
                background-position: center;
                content: '\00a0';
                display: block;
                height: $site-nav__signet-size--medium;
            }
            &:after {
                content: none;
            }
        }
    }

    @include large {
        .site-nav__logo-text:before {
            height: $site-nav__signet-size--large;
        }
    }
</style>

<style lang="scss" scoped>
    @import '~assets/styles/variables';

    .burger-toggle__input {
        /*display: none;*/
        position: absolute;
        z-index: 10;
    }

    .burger-toggle--large {
        font-size: $site-nav__bar-font-size--small;
    }

    .burger-toggle__menu-bars::before {
        @include icon;
        font-family: "Font Awesome 5 Pro";
        font-weight: 400;
        content: "\f0c9";
    }

    @include medium {
        .burger-toggle__label--mobile-only {
            display: none;
        }
    }
</style>
