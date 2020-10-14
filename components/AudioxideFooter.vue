<template>
    <footer class="site-foot">
        <hr class="site-foot_divider">
        <nav>
            <ul class="site-foot_nav">
                <li class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--site-logo site-foot_nav-item--middle">
                    <span>Audioxide</span></li>
                <li class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--facebook site-foot_nav-item--left"><span>Facebook</span><icon :icon="['fab', 'facebook-f']" /></li>
                <li class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--twitter site-foot_nav-item--left"><span>Twitter</span><icon :icon="['fab', 'twitter']" /></li>
                <li class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--instagram"><span>Instagram</span><icon :icon="['fab', 'instagram']" /></li>
                <li class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--rss"><span>RSS feed</span><icon icon="rss" /></li>
                <li class="site-foot_nav-item">Bribes</li>
                <li class="site-foot_nav-item">Newsletter</li>
                <li class="site-foot_nav-item">Contact</li>
            </ul>
        </nav>
        <p>&copy; {{ year }}. All rights reserved.</p>
    </footer>
</template>

<script>
import Icon from '~/components/Icon.vue';

export default {
    name: "AudioxideFooter",
    components: { Icon },
    data: () => ({
        year: new Date().getFullYear(),
    })
}
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .site-foot {
        width: 90%;
        margin: 0 auto;
        position: relative;
        text-align: center;
        font-family: $base-fontstack;
    }

    @include small {
        .site-foot {
            width: 75%;
        }
    }

    @include medium {
        .site-foot {
            width: 50%;
        }
    }

    @include large {
        .site-foot {
            width: 40%;
        }
    }

    .site-foot_divider {
        border: 0;
        border-top: 3px solid lightgrey;
    }

    .site-foot_nav {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        margin: calc(#{$site-foot__icon-size} * 0.75) auto;
    }

    @include medium {
        .site-foot_nav {
            width: 60%;
        }
    }

    .site-foot_nav-item {
        order: 2;
        width: calc(100% / 3);
        margin-top: 1em;
        &.site-foot_nav-item--middle {
            order: 1;
        }
        &.site-foot_nav-item--left {
            order: 0;
        }
        &.site-foot_nav-item--icon {
            width: 20%;
            font-size: 1.3em;
            margin-top: 0;
            & span {
                display: none;
            }
        }
        &.site-foot_nav-item--site-logo::before {
            background: black;
            background-image: $logo-wave;
            background-size: cover;
            background-position: center;
            content: '\00a0';
            width: $site-foot__logo-size;
            height: $site-foot__logo-size;
            margin-top: 0;
        }
    }
</style>
