<script>
	import { BLUESKY_URL, INSTAGRAM_URL, PATREON_URL, SITE_FOUNDING_YEAR } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import Icon from '../Icon.svelte';
	import LogoBordered from '../logos/LogoBordered.svelte';

	const currentYear = new Date().getFullYear();
</script>

<hr />
<footer>
	<div class="social-links">
		<a href={BLUESKY_URL} target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
			<Icon icon={icons.blueSky} />
		</a>
		<a href={PATREON_URL} target="_blank" rel="noopener noreferrer" aria-label="Patreon">
			<Icon icon={icons.patreon} />
		</a>
		<a href="/" aria-label="Audioxide homepage">
			<LogoBordered />
		</a>
		<a
			href="mailto:fred@audioxide.com"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Contact email"
		>
			<Icon icon={icons.envelope} />
		</a>
		<a href="/feed" target="_blank" rel="noopener noreferrer" aria-label="RSS feed">
			<Icon icon={icons.rss} />
		</a>
	</div>
	<ul class="site-links">
		<li><a href="/about">About</a></li>
		<li><a href="/privacy">Privacy</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
	<div class="copyright">© {SITE_FOUNDING_YEAR}-{currentYear}. All rights reserved.</div>
</footer>

<style>
	hr {
		width: 95%;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 1rem;
	}
	footer {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 2rem 0;
	}
	.social-links {
		max-width: 300px;
		display: grid;
		grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
		gap: 1.5em;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}
	.site-links {
		max-width: 300px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1em;
		align-items: center;
	}
	.copyright {
		font-size: 0.8em;
		color: gray;
		margin-top: 1em;
	}
</style>
