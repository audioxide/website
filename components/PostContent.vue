<template>
  <span
    ref="contentParent"
    class="content"
    :class="{ decorate }"
    v-html="content"
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type PartialEvent = {
  preventDefault: Event['preventDefault']
  target: Event['target']
}

export default Vue.extend({
  name: 'PostContent',
  props: {
    content: { type: String, required: true },
    decorate: { type: Boolean, default: false }
  },
  data: () => ({
    handler: null as ((evt: PartialEvent) => void) | null
  }),
  mounted() {
    const parent = this.$refs.contentParent
    let preventDefault: PartialEvent['preventDefault']
    this.handler = (evt: PartialEvent) => {
      preventDefault = preventDefault || evt.preventDefault.bind(evt)
      const elm = evt.target
      if (!(elm instanceof Element)) return
      if (elm.nodeName !== 'A') {
        if (parent === elm.parentNode || !this.handler) return
        this.handler({ preventDefault, target: elm.parentNode })
        return
      }
      const anchorElement = elm as HTMLAnchorElement
      const rawHref = anchorElement.getAttribute('href')
      const url = anchorElement.href
      let host: string, pathname: string
      if (
        window.URL &&
        window.URL.prototype &&
        'href' in window.URL.prototype
      ) {
        ;({ host, pathname } = new URL(url))
      } else {
        // No version of IE supports an instance of URL
        const uriRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
        const result = url.match(uriRegex)
        if (!result) return
        host = result[4]
        pathname = result[5]
      }
      // Ensure anything on the current or audioxide domain passes except anchor
      const isInternal =
        host === window.location.host ||
        host.endsWith('.audioxide.com') ||
        url.startsWith('https://audioxide.com')
      const isAnchor = rawHref && rawHref.startsWith('#')
      if (isInternal && !isAnchor) {
        evt.preventDefault()
        this.$router.push(pathname)
      }
    }

    if (parent instanceof Element) {
      parent.addEventListener('click', this.handler, false)
    }
  },
  beforeDestroy() {
    const parent = this.$refs.contentParent
    if (this.handler && parent instanceof Element) {
      parent.removeEventListener('click', this.handler)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

/* Default styling (MOBILE) */

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

    h2,
    h3,
    h4 {
      font-family: $heading-fontstack;
      font-weight: 500;
      font-size: 1.7em;
      margin: $site-content__spacer--x-large auto 0;
      padding-bottom: 20px;
    }
    h2 + h3,
    h3 + h4 {
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
      border-left: 5px solid $colour-grey--lighter;
      padding-left: 20px;
    }
    p,
    blockquote {
      & + p,
      & + blockquote,
      & + h2,
      & + h3,
      & + h4 {
        margin-top: $site-content__spacer--large;
      }
    }
    figure {
      margin-bottom: $site-content__spacer--x-large;
      color: $colour-grey;
    }
    figure img {
      border-radius: 15px;
    }
    figcaption {
      text-align: right;
      padding-right: 15px;
      font-family: $heading-fontstack;
      font-size: $site-content__font--small;
    }
    table {
      font-family: $heading-fontstack;
      margin-top: $site-content__spacer--x-large;
      margin-bottom: $site-content__spacer--x-large;
      margin-left: auto;
      margin-right: auto;
      td,
      th {
        border: 1px solid $colour-grey;
        padding: 0.5rem;
        text-align: left;
      }
      tr {
        line-height: 1.3;
      }
    }
    .table-container {
      overflow-x: auto;
    }
    .article-album-image {
      border: 1px solid #dddddd;
    }
    youtube-video {
      @include medium {
        padding-bottom: 37.6875%;
      }
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      height: 0;
      margin-top: $site-content__spacer--x-large;
      margin-bottom: $site-content__spacer--x-large;
      margin-left: auto;
      margin-right: auto;
    }
    .gif-container {
      margin: $site-content__spacer--x-large auto;
    }
    .block-gap {
      margin-top: 4em;
    }
    hr {
      @include hr-line-styles;
      margin-top: $site-content__spacer--x-large;
      margin-bottom: $site-content__spacer--x-large;
    }
    ul {
      list-style-type: disc;
      margin: 0 auto;
      margin-top: $site-content__spacer--x-large;
      margin-bottom: $site-content__spacer--x-large;
      padding-left: 20px;
    }
    li {
      padding-bottom: 0.5em;
    }
  }
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.decorate.content ::v-deep {
  & > p:first-of-type:first-letter {
    font-size: $site-content__font--xx-large;
    float: left;
    line-height: 0.85em;
  }
}

/* Medium styling (TABLET) */

/* Large styling (DESKTOP) */

@include medium {
  .decorate.content ::v-deep {
    & > {
      p,
      img,
      h2,
      h3,
      h4,
      blockquote,
      ul,
      table,
      hr,
      youtube-video,
      .gif-container {
        width: 67%;
      }
    }

    & .pull-right {
      float: right;
      margin-right: -25%;
    }
    & .pull-left {
      float: left;
      margin-left: -25%;
    }
  }
}
</style>
