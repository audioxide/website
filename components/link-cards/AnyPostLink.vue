<script lang="ts">
import { VNode, PropType } from 'vue'
import PostLink from '@/components/link-cards/PostLink.vue'
import ArticleLink from '@/components/link-cards/ArticleLink.vue'
import ReviewLink from '@/components/link-cards/ReviewLink.vue'

const ALBUM_TYPES = ['reviews']

export default PostLink.extend({
  name: 'AnyPostLink',
  props: {
    imageFormat: { type: String as PropType<ImageSizeAspectRatios> }
  },
  render(h): VNode {
    const opts = { props: { ...this.$props } }
    const type = this.post.metadata.type
    if (type === 'listening-parties' && typeof this.$props !== 'string') {
      opts.props.imageFormat = 'square'
    }
    return ALBUM_TYPES.includes(type)
      ? h(ReviewLink, opts)
      : h(ArticleLink, opts)
  }
})
</script>
