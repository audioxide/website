<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
    name: 'PostLink',
    props: {
        post: { type: Object as PropType<Post>, required: true },
        imageSize: { type: String as PropType<ImageSizeResolutions>, default: 'small' },
        image: { type: Boolean, default: true },
        title: { type: Boolean, default: true },
        blurb: { type: Boolean, default: true },
        author: { type: Boolean, default: true },
    },
});
</script>
