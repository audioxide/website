<script lang="ts">
	let {
		image,
		title,
		link,
		blurb,
		isFlatView,
		primaryColor
	}: {
		image: string;
		title: string;
		link: string;
		blurb: string;
		isFlatView?: boolean;
		primaryColor: string | undefined;
	} = $props();
</script>

<a href={link}>
	<div class={isFlatView ? 'card-flat' : 'card-reg'} style="--primary-color: {primaryColor}">
		<img src={image} alt={title} class:border={primaryColor} />
		<div>
			<h3>{title}</h3>
			<p>{blurb}</p>
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
		margin: 0 0 0.5rem 0;
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
