<template>
  <footer class="site-foot">
    <nav>
      <ul class="site-foot_nav">
        <li
          class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--site-logo site-foot_nav-item--middle"
        >
          <span>Audioxide</span>
        </li>
        <li
          class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--left"
        >
          <span>Facebook</span
          ><a :href="FACEBOOK_URL" aria-label="Facebook"
            ><img
              class="svg-icon"
              alt="Facebook emblem"
              src="@/assets/icons/facebook.svg"
          /></a>
        </li>
        <li
          class="site-foot_nav-item site-foot_nav-item--icon site-foot_nav-item--left"
        >
          <span>Twitter</span
          ><a :href="TWITTER_URL" aria-label="Twitter"
            ><img
              class="svg-icon"
              alt="Twitter emblem"
              src="@/assets/icons/twitter.svg"
          /></a>
        </li>
        <li class="site-foot_nav-item site-foot_nav-item--icon">
          <span>Instagram</span
          ><a :href="INSTAGRAM_URL" aria-label="Instagram"
            ><img
              class="svg-icon"
              alt="Instagram emblem"
              src="@/assets/icons/instagram.svg"
          /></a>
        </li>
        <li class="site-foot_nav-item site-foot_nav-item--icon">
          <span>RSS feed</span
          ><a :href="RSS_BASE" aria-label="RSS feed"
            ><img class="svg-icon" alt="RSS icon" src="@/assets/icons/rss.svg"
          /></a>
        </li>
        <li class="site-foot_nav-item">
          <nuxt-link to="/about/">About</nuxt-link>
        </li>
        <li class="site-foot_nav-item">
          <a :href="NEWSLETTER_URL">Newsletter</a>
        </li>
        <li class="site-foot_nav-item">
          <nuxt-link to="/privacy/">Privacy</nuxt-link>
        </li>
        <li class="site-foot_nav-item">
          <nuxt-link to="/contact/">Contact</nuxt-link>
        </li>
      </ul>
    </nav>
    <p class="copyright-jargon">
      &copy; {{ SITE_FOUNDING_YEAR }}-{{ year }}. All rights reserved.
    </p>
  </footer>
</template>

<script>
import * as SITE_CONSTANTS from '@/assets/siteConstants'

export default {
  name: 'SiteFooter',
  data: () => ({
    year: new Date().getFullYear(),
    ...SITE_CONSTANTS,
  }),
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.site-foot {
  @include site-content__subtext;
  font-family: $heading-fontstack;
  width: 90%;
  margin: 40px auto 0;
  position: relative;
  text-align: center;
  padding-bottom: 3em;
  @include line-styles('top');
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

.site-foot_nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
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
  width: calc(100% / 4);
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
    a {
      $transitionMs: 0.25s;
      transition: $transitionMs color ease-in-out,
        $transitionMs background-color ease-in-out;
      color: black;
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 38px;
      &:hover {
        .svg-icon {
          filter: invert(25%) sepia(78%) saturate(5157%) hue-rotate(334deg)
            brightness(95%) contrast(98%);
          $transitionMs: 0.25s;
        }
      }
    }
    .svg-icon {
      border-radius: 5rem;
    }
    & span {
      display: none;
    }
  }
  &.site-foot_nav-item--site-logo {
    max-width: 56px;
    &::before {
      background: black;
      background-image: $logo-wave;
      background-size: cover;
      background-position: center;
      content: '\00a0';
      width: 100%;
      height: 0;
      margin: 0 auto;
      max-width: 56px;
      max-height: 56px;
      padding-bottom: 100%;
      display: block;
      border-radius: 2rem;
    }
  }
}
</style>
