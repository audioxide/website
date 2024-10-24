<script lang="ts">
	import { styleSettings } from '$lib/styles/config';

	let {
		icon,
		size = styleSettings.defaultIconSize,
		color = styleSettings.defaultIconColor
	}: {
		icon: { viewBox: string; d: string };
		size?: string | number;
		color?: string;
	} = $props();
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
