export async function load({ fetch }) {
	const response = await fetch('api/reviews.json');
	const reviews = await response.json();
	return { reviews };
}
