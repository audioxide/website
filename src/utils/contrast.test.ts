import { expect, test } from 'vitest';
import ColorContrastChecker from 'color-contrast-checker';
import type { ReviewMetadata } from '$lib/types/reviews';

const reviews = await fetch(`https://api.audioxide.com/reviews.json`);
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
		const summaryTextColour = metadata.colours[3] ? metadata.colours[3] : primaryColor;

		const primaryContrast = ccc.isLevelAA(primaryColor, '#ffffff', 40);
		const secondaryContrast = ccc.isLevelAA(secondaryColor, primaryColor);
		const tertiaryContrast = ccc.isLevelAA(tertiaryColor, primaryColor);
		const summaryContrast = ccc.isLevelAA(summaryTextColour, '#ffffff', 18);

		if (!primaryContrast || !secondaryContrast || !tertiaryContrast || !summaryContrast) {
			failingReviews.push(metadata.album);
		} else {
			passingReviews.push(metadata.album);
		}

		// expect(primaryContrast).toBe(true);
		// expect(secondaryContrast).toBe(true);
		// expect(tertiaryContrast).toBe(true);
	});

	console.log('Passing reviews: ' + passingReviews.length);
	console.log('Failing reviews: ' + failingReviews.length);

	console.log('Failing reviews:');
	failingReviews.forEach((album) => {
		console.warn(album);
	});
});
