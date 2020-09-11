<template>
    <section>
        <div v-for="(post, key) in listing" :key="key">
            <p>
                <nuxt-link :to="`/${post.metadata.type}/${post.metadata.slug}`">
                    <slot :post="post">{{ post.metadata.title | unescape }}</slot>
                </nuxt-link>
            </p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
    name: 'PostListing',
    props: {
        listing: { type: Array as PropType<Post[]>, required: true },
    },
});
</script>
