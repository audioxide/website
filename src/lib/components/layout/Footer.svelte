<script>
	import { INSTAGRAM_URL, SITE_FOUNDING_YEAR, SITE_NAME, X_URL } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import Icon from '../Icon.svelte';

	const currentYear = new Date().getFullYear();
</script>

<hr />
<footer>
	<div class="social-links">
		<a href={X_URL} target="_blank" rel="noopener noreferrer">
			<Icon icon={icons.x} />
		</a>
		<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
			<Icon icon={icons.instagram} />
		</a>
		<a href="/">
			<img
				class="logo-icon"
				src="/branding/bordered-emblem-black-transparent.png"
				alt={`${SITE_NAME} logo`}
			/>
		</a>

		<a href="mailto:fred@audioxide.com" target="_blank" rel="noopener noreferrer">
			<Icon icon={icons.envelope} />
		</a>
		<a href="/feed" target="_blank" rel="noopener noreferrer">
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
