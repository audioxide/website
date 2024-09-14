<script lang="ts">
	let {
		image,
		title,
		link,
		blurb,
		primaryColor
	}: {
		image: string;
		title: string;
		link: string;
		blurb: string;
		primaryColor: string | undefined;
	} = $props();
</script>

<div class="card" style="--primary-color: {primaryColor}">
	<a href={link}>
		<img src={image} alt={title} class:border={primaryColor} />
		<h3>{title}</h3>
		<p>{blurb}</p>
	</a>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
	}

	.card a {
		text-decoration: none;
		color: black;
	}

	img {
		width: 100%;
		height: auto;
		border-radius: 5px;
		margin-bottom: 0.8rem;
	}

	.border {
		border: 3px solid var(--primary-color);
	}

	h3 {
		margin: 0.5rem 0;
		color: var(--link-color);
		text-decoration: underline;
	}

	p {
		margin: 0;
		text-decoration: none;
		color: black;
		font-size: 1rem;
		line-height: 1.3;
	}
</style>
