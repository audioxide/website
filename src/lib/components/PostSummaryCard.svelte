<script lang="ts">
	let {
		image,
		title,
		link,
		aspectRatio,
		blurb,
		isFlatView,
		primaryColor
	}: {
		image: string;
		title: string;
		link: string;
		aspectRatio: '1 / 1' | '3 / 2';
		blurb: string;
		isFlatView?: boolean;
		primaryColor?: string;
	} = $props();
</script>

<a href={link}>
	<div
		class={isFlatView ? 'card-flat' : 'card-reg'}
		style="--primary-color: {primaryColor
			? primaryColor
			: '#f5f5f5'}; --aspect-ratio: {aspectRatio};"
	>
		<img loading="lazy" src={image} alt={title} class:border={primaryColor} />
		<div>
			<h3>{title}</h3>
			<div class="blurb">{blurb}</div>
		</div>
	</div>
</a>

<style>
	.card-reg {
		display: flex;
		flex-direction: column;
	}
	.card-flat {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: 1rem;
	}

	a {
		color: black;
		text-decoration: none;
	}
	img {
		width: 100%;
		height: auto;
		border-radius: 5px;
		margin-bottom: 0.8rem;
		background-color: var(--primary-color);
		aspect-ratio: var(--aspect-ratio);
	}

	.border {
		border: 3px solid var(--primary-color);
	}

	h3 {
		margin: 0 0 0.5rem 0;
		color: var(--link-color);
		text-decoration: underline;
		text-underline-offset: 0.2em;
		text-decoration-thickness: 0.1em;
	}

	.blurb {
		font-size: 1rem;
		font-family: 'Spectral', serif;
		margin: 0;
		text-decoration: none;
		color: black;
		font-size: 1rem;
		line-height: 1.3;
	}
</style>
