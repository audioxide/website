<script lang="ts">
	import { styleSettings } from '$lib/styles/config';

	export let icon: { viewBox: string; d: string };
	export let size: string | number = styleSettings.defaultIconSize;
	export let color: string = styleSettings.defaultIconColor;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	height={size}
	width={size}
	viewBox={icon.viewBox}
	fill={color}
	style={'display: inline-block;'}
>
	<path d={icon.d} />
</svg>
