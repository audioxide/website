<script lang="ts">
	let { datePublished }: { datePublished: string } = $props();

	const prettifyDate = (date: string): string => {
		const asDate = new Date(date);
		const day = asDate.getDate().toString().padStart(2, '0');
		const month = (asDate.getMonth() + 1).toString().padStart(2, '0');
		const year = asDate.getFullYear().toString().padStart(4, '0');
		return `${day}.${month}.0${year}`;
	};
</script>

<time datetime={datePublished}>{prettifyDate(datePublished)}</time>

<style>
	time {
		font-family: 'Source Sans Pro', sans-serif;
		color: gray;
		font-size: 0.9rem;
	}
</style>
