<template>
    <portal to="global">
        <div :style="{ top: top, top: left }">
            This is a popup for {{slug}}
        </div>
    </portal>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ReviewPreview",
    props: {
        slug: String,
        top: Number,
        left: Number
    },
    created() {
        console.log(this.slug, this.top, this.left);
    }
});
</script>

<style scoped>
div {
    position: absolute;
}
</style>