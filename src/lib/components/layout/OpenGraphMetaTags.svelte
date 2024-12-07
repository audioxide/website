<script lang="ts">
	let {
		link,
		title,
		description,
		image
	}: { link: string; title: string; description: string; image: string } = $props();
</script>

<meta property="og:url" content={link} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />

<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="audioxide.com" />
<meta property="twitter:url" content={link} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
