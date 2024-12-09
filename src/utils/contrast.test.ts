import { expect, test } from 'vitest';
import ColorContrastChecker from 'color-contrast-checker';
import { API_URL } from '$lib/constants';
import type { ReviewMetadata } from '$lib/types/reviews';

const reviews = await fetch(`${API_URL}/reviews.json`);
const data: {
	metadata: ReviewMetadata;
}[] = await reviews.json();

const ccc = new ColorContrastChecker();

test('Colour contrast on review pages', () => {
	const passingReviews: string[] = [];
	const failingReviews: string[] = [];

	data.forEach(({ metadata }) => {
		const primaryColor = metadata.colours[0];
		const secondaryColor = metadata.colours[1];
		const tertiaryColor = metadata.colours[2];

		const primaryContrast = ccc.isLevelAA(primaryColor, '#ffffff');
		const secondaryContrast = ccc.isLevelAA(secondaryColor, primaryColor);
		const tertiaryContrast = ccc.isLevelAA(tertiaryColor, primaryColor);

		if (!primaryContrast || !secondaryContrast || !tertiaryContrast) {
			failingReviews.push(metadata.album);
		} else {
			passingReviews.push(metadata.album);
		}

		// expect(primaryContrast).toBe(true);
		// expect(secondaryContrast).toBe(true);
		// expect(tertiaryContrast).toBe(true);
	});

	console.log('Passing reviews: ' + passingReviews.length);
	failingReviews.forEach((album) => {
		console.log(album);
	});
});
